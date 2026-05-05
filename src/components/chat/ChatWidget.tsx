'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

// ────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant' | 'staff';
  content: string;
}

// ────────────────────────────────────────────────────────────────
// SVG: Friendly female assistant illustration
// ────────────────────────────────────────────────────────────────
function AssistantAvatar({ size = 56 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Background circle */}
      <circle cx="40" cy="40" r="40" fill="#FFF5F2" />

      {/* Hair (back layer) */}
      <ellipse cx="40" cy="38" rx="21" ry="23" fill="#3D2B1F" />

      {/* Face */}
      <circle cx="40" cy="44" r="18" fill="#FDDBB4" />

      {/* Hair top / bangs */}
      <ellipse cx="40" cy="24" rx="21" ry="11" fill="#3D2B1F" />
      <ellipse cx="28" cy="29" rx="8" ry="7" fill="#3D2B1F" />
      <ellipse cx="52" cy="29" rx="8" ry="7" fill="#3D2B1F" />

      {/* Ears */}
      <ellipse cx="22" cy="44" rx="3.5" ry="4" fill="#FDDBB4" />
      <ellipse cx="58" cy="44" rx="3.5" ry="4" fill="#FDDBB4" />

      {/* Eyes (closed/happy) */}
      <path d="M32 42 Q34.5 39.5 37 42" stroke="#3D2B1F" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M43 42 Q45.5 39.5 48 42" stroke="#3D2B1F" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Cheeks */}
      <ellipse cx="31" cy="47" rx="4.5" ry="2.5" fill="#F4A8A0" opacity="0.5" />
      <ellipse cx="49" cy="47" rx="4.5" ry="2.5" fill="#F4A8A0" opacity="0.5" />

      {/* Smile */}
      <path d="M34 51 Q40 56.5 46 51" stroke="#C06060" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Headset band */}
      <path d="M21 40 Q21 20 40 20 Q59 20 59 40" stroke="#2A1F1A" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* Headset cups */}
      <rect x="15" y="38" width="9" height="11" rx="4" fill="#2A1F1A" />
      <rect x="56" y="38" width="9" height="11" rx="4" fill="#2A1F1A" />

      {/* Microphone arm */}
      <path d="M16 48 Q13 55 16 60" stroke="#2A1F1A" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="61" r="2.5" fill="#e04102" />

      {/* Clothes / collar */}
      <path d="M24 72 Q32 63 40 66 Q48 63 56 72 L60 80 L20 80 Z" fill="#e04102" />
      {/* Collar detail */}
      <path d="M40 66 L36 72 L40 75 L44 72 Z" fill="#c93800" />
    </svg>
  );
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
  content:
    'こんにちは！株式会社ZESTのAIアシスタントです。サービスや料金、導入事例など、お気軽にご質問ください。',
};

// ────────────────────────────────────────────────────────────────
// Session ID (per page session, not persisted)
// ────────────────────────────────────────────────────────────────
function generateSessionId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
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
      <div className="flex-shrink-0 mb-0.5">
        <AssistantAvatar size={32} />
      </div>
      <div className={`max-w-[80%] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm leading-7 whitespace-pre-wrap break-words ${
        isStaff
          ? 'text-white'
          : 'bg-slate-100 text-slate-800'
      }`}
        style={isStaff ? { backgroundColor: '#1a2744' } : {}}
      >
        {isStaff && (
          <p className="text-xs font-bold mb-1" style={{ color: '#e04102' }}>担当者</p>
        )}
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
      <div className="flex-shrink-0">
        <AssistantAvatar size={32} />
      </div>
      <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block"
            style={{
              animation: 'chat-bounce 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
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
  const [lastStaffAt, setLastStaffAt] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 吹き出しを3秒後に表示、8秒後に自動非表示
  useEffect(() => {
    const show = setTimeout(() => setShowBubble(true), 3000);
    const hide = setTimeout(() => setShowBubble(false), 11000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  // スクロールを下部へ
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // チャットが開いたらフォーカス
  useEffect(() => {
    if (open) {
      setShowBubble(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  // エスカレーション後: スタッフメッセージをポーリング（5秒ごと）
  useEffect(() => {
    if (!escalated) return;

    async function poll() {
      const since = lastStaffAt ?? '';
      const url = `/api/chat/poll?sessionId=${sessionId}${since ? `&since=${encodeURIComponent(since)}` : ''}`;
      try {
        const res = await fetch(url, { cache: 'no-store' });
        const data = await res.json();
        if (data.messages && data.messages.length > 0) {
          const newMsgs: Message[] = data.messages.map((m: { content: string; sentAt: string }) => ({
            role: 'staff' as const,
            content: m.content,
          }));
          setMessages((prev) => [...prev, ...newMsgs]);
          setLastStaffAt(data.messages[data.messages.length - 1].sentAt);
        }
      } catch {
        // ignore polling errors
      }
    }

    poll();
    pollRef.current = setInterval(poll, 5000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escalated, sessionId]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading || escalated) return;

    const userMsg: Message = { role: 'user', content: text };
    const nextMessages = [...messages, userMsg];

    setMessages(nextMessages);
    setInput('');
    setLoading(true);
    setError(null);

    // APIに渡す形式に変換（staff メッセージは assistant として扱う）
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
      setError(
        err instanceof Error
          ? err.message
          : '送信に失敗しました。しばらくしてからお試しください。'
      );
    } finally {
      setLoading(false);
    }
  }, [input, loading, escalated, messages, sessionId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes chat-bubble-in {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes chat-avatar-in {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }
        .chat-panel-enter   { animation: chat-slide-up  0.22s ease-out both; }
        .chat-bubble-enter  { animation: chat-bubble-in 0.25s ease-out both; }
        .chat-avatar-enter  { animation: chat-avatar-in 0.30s ease-out both; }
      `}</style>

      {/* ── Chat Panel ── */}
      {open && (
        <div
          className="chat-panel-enter fixed bottom-28 right-5 z-50 w-[360px] max-w-[calc(100vw-2.5rem)]
                     bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
          style={{ height: '520px' }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 text-white flex-shrink-0"
            style={{ backgroundColor: '#1a2744' }}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-white">
              <AssistantAvatar size={36} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold leading-tight">ZEST AIアシスタント</p>
              <p className="text-xs leading-tight" style={{ color: '#F4A8A0' }}>
                {escalated ? '担当者に引き継ぎ中...' : 'オンライン'}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-white transition-colors p-1"
              aria-label="チャットを閉じる"
            >
              <IconClose />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
            {loading && <TypingIndicator />}
            {error && (
              <p className="text-xs text-red-500 text-center px-2">{error}</p>
            )}
            {escalated && (
              <p className="text-xs text-slate-500 text-center bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                ⏳ 担当者からの返信をお待ちください
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
                placeholder={
                  escalated
                    ? '担当者からの返信をお待ちください'
                    : 'メッセージを入力… (Enter で送信)'
                }
                disabled={loading || escalated}
                rows={1}
                className="flex-1 resize-none rounded-xl border border-slate-300
                           px-3 py-2.5 text-sm leading-6 outline-none
                           focus:ring-1 disabled:bg-slate-50 disabled:text-slate-400
                           placeholder:text-slate-400 transition-colors"
                style={{ minHeight: '40px', maxHeight: '120px' }}
                onFocus={(e) => (e.target.style.borderColor = '#e04102')}
                onBlur={(e) => (e.target.style.borderColor = '')}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading || escalated}
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                           text-white transition-all duration-150
                           disabled:opacity-40 disabled:cursor-not-allowed
                           hover:opacity-90 active:scale-95"
                style={{ backgroundColor: '#e04102' }}
                aria-label="送信"
              >
                <IconSend />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-2">
              AIの回答は参考情報です。重要事項はお問い合わせください。
            </p>
          </div>
        </div>
      )}

      {/* ── 吹き出し ── */}
      {showBubble && !open && (
        <div
          className="chat-bubble-enter fixed z-50 flex items-center"
          style={{ bottom: '38px', right: '88px' }}
        >
          <div
            className="relative bg-white rounded-2xl shadow-lg border border-slate-200
                       px-4 py-2.5 text-sm font-medium text-slate-700 whitespace-nowrap"
          >
            お気軽にお問い合わせください 😊
            {/* 吹き出しの三角 */}
            <span
              className="absolute right-[-8px] top-1/2 -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[8px]"
              style={{ borderLeftColor: 'white' }}
            />
            <span
              className="absolute right-[-9px] top-1/2 -translate-y-1/2 border-y-[7px] border-y-transparent border-l-[9px]"
              style={{ borderLeftColor: '#e2e8f0', zIndex: -1 }}
            />
            {/* 閉じるボタン */}
            <button
              onClick={() => setShowBubble(false)}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-400 text-white
                         flex items-center justify-center hover:bg-slate-500 transition-colors"
              aria-label="吹き出しを閉じる"
            >
              <IconClose size={10} />
            </button>
          </div>
        </div>
      )}

      {/* ── フローティングアバターボタン ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="chat-avatar-enter fixed bottom-5 right-5 z-50 rounded-full shadow-xl
                   transition-all duration-200 hover:scale-105 active:scale-95
                   overflow-hidden border-2 border-white"
        style={{
          width: '64px',
          height: '64px',
          backgroundColor: '#FFF5F2',
        }}
        aria-label={open ? 'チャットを閉じる' : 'チャットで問い合わせ'}
      >
        {open ? (
          <div
            className="w-full h-full flex items-center justify-center text-white"
            style={{ backgroundColor: '#e04102' }}
          >
            <IconClose size={22} />
          </div>
        ) : (
          <AssistantAvatar size={64} />
        )}
      </button>
    </>
  );
}
