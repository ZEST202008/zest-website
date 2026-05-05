'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

// ────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant' | 'staff';
  content: string;
}

// ────────────────────────────────────────────────────────────────
// Icons
// ────────────────────────────────────────────────────────────────
function IconClose({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────
// Initial greeting
// ────────────────────────────────────────────────────────────────
const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: 'こんにちは！株式会社ZESTのAIアシスタントです。サービスや料金、導入事例など、お気軽にご質問ください。',
};

// ────────────────────────────────────────────────────────────────
// Session ID
// ────────────────────────────────────────────────────────────────
function generateSessionId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

// ────────────────────────────────────────────────────────────────
// Small avatar for chat header / message bubbles
// background-image で顔エリアにズームイン表示
// backgroundSize で倍率、backgroundPosition で位置を調整
// ────────────────────────────────────────────────────────────────
function AssistantAvatarSmall() {
  return (
    <div
      className="flex-shrink-0"
      style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        backgroundColor: '#f8f4f0',
        backgroundImage: 'url(/chat-assistant.jpeg)',
        backgroundSize: '280%',       // 拡大率：大きいほど顔にズームイン
        backgroundPosition: '50% 8%', // 横:中央 縦:上から8%（顔の位置に合わせて調整）
        backgroundRepeat: 'no-repeat',
        flexShrink: 0,
      }}
      role="img"
      aria-label="アシスタント"
    />
  );
}

// ────────────────────────────────────────────────────────────────
// Message bubble
// ────────────────────────────────────────────────────────────────
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  const isStaff = message.role === 'staff';

  if (isUser) {
    return (
      <div className="flex flex-row-reverse gap-2">
        <div
          className="max-w-[80%] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-7 text-white whitespace-pre-wrap break-words"
          style={{ backgroundColor: '#e04102' }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-2 items-end">
      <AssistantAvatarSmall />
      <div
        className={`max-w-[80%] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm leading-7 whitespace-pre-wrap break-words ${
          isStaff ? 'text-white' : 'bg-slate-100 text-slate-800'
        }`}
        style={isStaff ? { backgroundColor: '#1a2744' } : {}}
      >
        {isStaff && <p className="text-xs font-bold mb-1" style={{ color: '#e04102' }}>担当者</p>}
        {message.content}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Typing indicator
// ────────────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex flex-row gap-2 items-end">
      <AssistantAvatarSmall />
      <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block"
            style={{ animation: 'chat-bounce 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Main Widget
// ────────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showBubble, setShowBubble] = useState(false);
  const [sessionId] = useState(() => generateSessionId());

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // useRef で最新の「最終取得時刻」を管理（stale closure を防ぐ）
  const lastStaffAtRef = useRef<string | null>(null);

  // 吹き出しを3秒後に表示、12秒後に自動非表示
  useEffect(() => {
    const show = setTimeout(() => setShowBubble(true), 3000);
    const hide = setTimeout(() => setShowBubble(false), 15000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setShowBubble(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  // エスカレーション後: スタッフ返信ポーリング（5秒ごと）
  // lastStaffAtRef を使うことで stale closure を回避し、無限ループを防止
  useEffect(() => {
    if (!escalated) return;

    async function poll() {
      const since = lastStaffAtRef.current;
      const url = `/api/chat/poll?sessionId=${sessionId}${since ? `&since=${encodeURIComponent(since)}` : ''}`;
      try {
        const res = await fetch(url, { cache: 'no-store' });
        const data = await res.json();
        if (data.messages?.length > 0) {
          const newMsgs: Message[] = data.messages.map((m: { content: string; sentAt: string }) => ({
            role: 'staff' as const,
            content: m.content,
          }));
          setMessages((prev) => [...prev, ...newMsgs]);
          // ref を直接更新（再レンダリング不要 & 次のポーリングに即反映）
          lastStaffAtRef.current = data.messages[data.messages.length - 1].sentAt;
        }
      } catch { /* ignore */ }
    }

    poll();
    pollRef.current = setInterval(poll, 5000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [escalated, sessionId]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);
    setError(null);

    // エスカレーション後は担当者へのメッセージとしてKVに保存
    if (escalated) {
      try {
        await fetch('/api/chat/visitor-reply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, message: text }),
        });
      } catch {
        // ネットワークエラーは無視（メッセージは画面には表示済み）
      } finally {
        setLoading(false);
      }
      return;
    }

    // エスカレーション前: Claude APIへ送信
    const apiMessages = nextMessages
      .filter((m) => m.role !== 'staff')
      .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, sessionId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'エラーが発生しました。');
      setMessages([...nextMessages, { role: 'assistant', content: data.reply }]);
      if (data.escalated) setEscalated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '送信に失敗しました。');
    } finally {
      setLoading(false);
    }
  }, [input, loading, escalated, messages, sessionId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // isComposing が true の間は日本語IMEの変換確定中なので送信しない
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <>
      <style>{`
        @keyframes chat-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30%            { transform: translateY(-4px); }
        }
        @keyframes chat-slide-up {
          from { opacity: 0; transform: translateY(14px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chat-float-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes chat-bubble-in {
          from { opacity: 0; transform: scale(0.9) translateX(10px); }
          to   { opacity: 1; transform: scale(1) translateX(0); }
        }
        .chat-panel-enter  { animation: chat-slide-up 0.22s ease-out both; }
        .chat-float-enter  { animation: chat-float-in 0.4s ease-out both; }
        .chat-bubble-enter { animation: chat-bubble-in 0.3s 0.15s ease-out both; }
      `}</style>

      {/* ── Chat Panel ── */}
      {open && (
        <div
          className="chat-panel-enter fixed z-50 w-[360px] max-w-[calc(100vw-2.5rem)]
                     bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
          style={{ bottom: '20px', right: '20px', height: '520px' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 text-white flex-shrink-0" style={{ backgroundColor: '#1a2744' }}>
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-slate-100">
              <Image
                src="/chat-assistant.jpeg"
                alt="アシスタント"
                width={36}
                height={36}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold leading-tight">ZEST AIアシスタント</p>
              <p className="text-xs leading-tight" style={{ color: '#F4A8A0' }}>
                {escalated ? '担当者に引き継ぎ中...' : 'オンライン'}
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="text-slate-300 hover:text-white transition-colors p-1" aria-label="閉じる">
              <IconClose />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg, i) => <MessageBubble key={i} message={msg} />)}
            {loading && <TypingIndicator />}
            {error && <p className="text-xs text-red-500 text-center px-2">{error}</p>}
            {escalated && (
              <p className="text-xs text-slate-500 text-center bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                担当者からの返信をお待ちください
              </p>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex-shrink-0 border-t border-slate-200 px-3 py-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder={escalated ? '担当者へメッセージを送る… (Enter で送信)' : 'メッセージを入力… (Enter で送信)'}
                disabled={loading}
                rows={1}
                className="flex-1 resize-none rounded-xl border border-slate-300 px-3 py-2.5 text-sm leading-6 outline-none disabled:bg-slate-50 disabled:text-slate-400 placeholder:text-slate-400 transition-colors"
                style={{ minHeight: '40px', maxHeight: '120px' }}
                onFocus={(e) => (e.target.style.borderColor = '#e04102')}
                onBlur={(e) => (e.target.style.borderColor = '')}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95"
                style={{ backgroundColor: '#e04102' }}
                aria-label="送信"
              >
                <IconSend />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-2">AIの回答は参考情報です。重要事項はお問い合わせください。</p>
          </div>
        </div>
      )}

      {/* ── フローティングトリガー（キャラクター画像 + 吹き出し） ── */}
      {!open && (
        <div
          className="chat-float-enter fixed z-50 flex items-end gap-0"
          style={{ bottom: '0px', right: '16px' }}
        >
          {/* 吹き出し */}
          {showBubble && (
            <div
              className="chat-bubble-enter relative mb-16 mr-3 bg-white rounded-2xl shadow-lg border border-slate-200 px-4 py-3 whitespace-nowrap"
            >
              <p className="text-sm font-semibold text-slate-700">お気軽にお問い合わせください</p>
              <p className="text-xs text-slate-400 mt-0.5">AIが24時間対応します</p>
              {/* 三角（右向き） */}
              <span
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  right: '-8px',
                  borderTop: '7px solid transparent',
                  borderBottom: '7px solid transparent',
                  borderLeft: '8px solid white',
                }}
              />
              <span
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  right: '-10px',
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderLeft: '9px solid #e2e8f0',
                  zIndex: -1,
                }}
              />
              {/* 閉じるボタン */}
              <button
                onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-400 hover:bg-slate-500 text-white flex items-center justify-center transition-colors"
                aria-label="閉じる"
              >
                <IconClose size={10} />
              </button>
            </div>
          )}

          {/* キャラクター画像ボタン */}
          <button
            onClick={() => setOpen(true)}
            className="flex-shrink-0 transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="チャットで問い合わせ"
          >
            <Image
              src="/chat-assistant.jpeg"
              alt="AIアシスタント"
              width={150}
              height={150}
              priority
            />
          </button>
        </div>
      )}

      {/* チャットが開いている間の閉じるボタン */}
      {open && (
        <button
          onClick={() => setOpen(false)}
          className="fixed z-50 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:opacity-90 active:scale-95"
          style={{ bottom: '548px', right: '20px', backgroundColor: '#e04102' }}
          aria-label="チャットを閉じる"
        >
          <IconClose size={16} />
        </button>
      )}
    </>
  );
}
