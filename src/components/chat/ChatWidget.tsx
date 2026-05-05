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
// SVG: Slim, formal young female assistant (waist-up portrait)
// ────────────────────────────────────────────────────────────────
function AssistantCharacter({ width = 96, height = 148 }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 148"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* ── Hair (back, dark brown) ── */}
      <path
        d="M24 42 Q20 18 48 14 Q76 18 72 42 L74 72 Q60 80 48 80 Q36 80 22 72 Z"
        fill="#2C1A0E"
      />
      {/* Flowing hair sides */}
      <path d="M22 42 Q16 55 18 75 Q24 82 28 80 Q22 72 24 58 Z" fill="#2C1A0E" />
      <path d="M74 42 Q80 55 78 75 Q72 82 68 80 Q74 72 72 58 Z" fill="#2C1A0E" />

      {/* ── Face ── */}
      <ellipse cx="48" cy="44" rx="22" ry="26" fill="#F5C9A0" />

      {/* ── Ears ── */}
      <ellipse cx="26" cy="44" rx="3" ry="4" fill="#F5C9A0" />
      <ellipse cx="70" cy="44" rx="3" ry="4" fill="#F5C9A0" />

      {/* ── Hair front / fringe (side-parted) ── */}
      <path
        d="M26 22 Q28 10 48 13 Q64 12 70 22 Q66 16 54 17 Q44 16 26 28 Z"
        fill="#2C1A0E"
      />
      {/* Side sweep left */}
      <path d="M26 22 Q22 30 24 42 Q28 30 34 26 Z" fill="#2C1A0E" />

      {/* ── Eyebrows (thin, arched) ── */}
      <path d="M35 30 Q39 27 43 29" stroke="#2C1A0E" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M53 29 Q57 27 61 30" stroke="#2C1A0E" strokeWidth="1.4" fill="none" strokeLinecap="round" />

      {/* ── Eyes ── */}
      {/* Left eye */}
      <ellipse cx="39" cy="36" rx="5" ry="3.5" fill="white" />
      <ellipse cx="39" cy="36.5" rx="3" ry="3" fill="#3D2010" />
      <ellipse cx="39" cy="36.5" rx="1.5" ry="1.5" fill="#111" />
      <circle cx="40.5" cy="35.2" r="0.9" fill="white" />
      {/* Top lash line */}
      <path d="M34 34.5 Q39 32 44 34.5" stroke="#2C1A0E" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Right eye */}
      <ellipse cx="57" cy="36" rx="5" ry="3.5" fill="white" />
      <ellipse cx="57" cy="36.5" rx="3" ry="3" fill="#3D2010" />
      <ellipse cx="57" cy="36.5" rx="1.5" ry="1.5" fill="#111" />
      <circle cx="58.5" cy="35.2" r="0.9" fill="white" />
      <path d="M52 34.5 Q57 32 62 34.5" stroke="#2C1A0E" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* ── Nose (minimal) ── */}
      <path d="M46 47 Q48 50 50 47" stroke="#D4906A" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* ── Cheeks ── */}
      <ellipse cx="33" cy="48" rx="7" ry="3.5" fill="#F4A8A0" opacity="0.3" />
      <ellipse cx="63" cy="48" rx="7" ry="3.5" fill="#F4A8A0" opacity="0.3" />

      {/* ── Smile (friendly, warm) ── */}
      <path d="M40 54 Q48 61 56 54" stroke="#C06060" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* Slight teeth hint */}
      <path d="M41 54.5 Q48 59 55 54.5" fill="white" opacity="0.6" />

      {/* ── Neck ── */}
      <rect x="43" y="67" width="10" height="16" rx="3" fill="#F5C9A0" />

      {/* ── White shirt / inner collar ── */}
      <path d="M28 80 L43 70 L48 76 L53 70 L68 80 L70 100 L26 100 Z" fill="white" />
      {/* V-neck seam */}
      <path d="M48 76 L44 90" stroke="#ddd" strokeWidth="0.8" fill="none" />
      <path d="M48 76 L52 90" stroke="#ddd" strokeWidth="0.8" fill="none" />

      {/* ── Blazer (navy) ── */}
      {/* Body */}
      <path d="M10 148 L14 95 Q20 80 28 80 L43 70 L48 78 L53 70 L68 80 Q76 80 82 95 L86 148 Z" fill="#1a2744" />
      {/* Left lapel */}
      <path d="M28 80 Q34 76 40 82 L36 100 Q24 90 14 95 Z" fill="#243558" />
      {/* Right lapel */}
      <path d="M68 80 Q62 76 56 82 L60 100 Q72 90 82 95 Z" fill="#243558" />
      {/* Lapel inner fold shadow */}
      <path d="M40 82 L48 78 L56 82 L52 92 L48 88 L44 92 Z" fill="#1a2744" />

      {/* ── Orange accent pin ── */}
      <circle cx="48" cy="84" r="3.5" fill="#e04102" />
      <circle cx="48" cy="84" r="1.8" fill="#ff6b3d" />

      {/* ── Headset band ── */}
      <path d="M25 36 Q25 12 48 10 Q71 12 71 36" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Headset cups */}
      <rect x="18" y="32" width="9" height="12" rx="4" fill="#1a1a1a" />
      <rect x="69" y="32" width="9" height="12" rx="4" fill="#1a1a1a" />
      {/* Mic arm */}
      <path d="M19 44 Q14 52 16 58" stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="59" r="2.5" fill="#e04102" />

      {/* ── Shoulder seams ── */}
      <path d="M14 95 Q12 85 18 80" stroke="#243558" strokeWidth="1" fill="none" />
      <path d="M82 95 Q84 85 78 80" stroke="#243558" strokeWidth="1" fill="none" />
    </svg>
  );
}

// Small avatar for chat header
function AssistantAvatarSmall({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <circle cx="48" cy="48" r="48" fill="#FFF5F2" />
      {/* Hair back */}
      <path d="M24 52 Q20 26 48 22 Q76 26 72 52 L72 78 Q60 86 48 86 Q36 86 24 78 Z" fill="#2C1A0E" />
      {/* Face */}
      <ellipse cx="48" cy="52" rx="21" ry="25" fill="#F5C9A0" />
      {/* Hair front */}
      <path d="M27 30 Q30 16 48 19 Q66 16 69 30 Q65 22 54 23 Q44 22 27 34 Z" fill="#2C1A0E" />
      <path d="M27 30 Q22 38 24 52 Q29 38 35 32 Z" fill="#2C1A0E" />
      {/* Eyebrows */}
      <path d="M35 38 Q39 35 43 37" stroke="#2C1A0E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M53 37 Q57 35 61 38" stroke="#2C1A0E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Eyes */}
      <ellipse cx="39" cy="43" rx="4.5" ry="3" fill="white" />
      <ellipse cx="39" cy="43.5" rx="2.5" ry="2.5" fill="#3D2010" />
      <ellipse cx="39" cy="43.5" rx="1.2" ry="1.2" fill="#111" />
      <circle cx="40.2" cy="42.5" r="0.7" fill="white" />
      <path d="M34.5 41.5 Q39 39 43.5 41.5" stroke="#2C1A0E" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <ellipse cx="57" cy="43" rx="4.5" ry="3" fill="white" />
      <ellipse cx="57" cy="43.5" rx="2.5" ry="2.5" fill="#3D2010" />
      <ellipse cx="57" cy="43.5" rx="1.2" ry="1.2" fill="#111" />
      <circle cx="58.2" cy="42.5" r="0.7" fill="white" />
      <path d="M52.5 41.5 Q57 39 61.5 41.5" stroke="#2C1A0E" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <ellipse cx="32" cy="55" rx="6" ry="3" fill="#F4A8A0" opacity="0.35" />
      <ellipse cx="64" cy="55" rx="6" ry="3" fill="#F4A8A0" opacity="0.35" />
      {/* Smile */}
      <path d="M39 61 Q48 68 57 61" stroke="#C06060" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* Headset */}
      <path d="M26 43 Q26 20 48 18 Q70 20 70 43" stroke="#1a1a1a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <rect x="19" y="39" width="9" height="12" rx="4" fill="#1a1a1a" />
      <rect x="68" y="39" width="9" height="12" rx="4" fill="#1a1a1a" />
      <path d="M20 51 Q15 58 17 63" stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="17" cy="64" r="2.5" fill="#e04102" />
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
      <div className="flex-shrink-0 mb-0.5 rounded-full overflow-hidden" style={{ width: 32, height: 32, backgroundColor: '#FFF5F2' }}>
        <AssistantAvatarSmall size={32} />
      </div>
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
      <div className="flex-shrink-0 rounded-full overflow-hidden" style={{ width: 32, height: 32, backgroundColor: '#FFF5F2' }}>
        <AssistantAvatarSmall size={32} />
      </div>
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
  const [lastStaffAt, setLastStaffAt] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 吹き出しを3秒後に表示
  useEffect(() => {
    const show = setTimeout(() => setShowBubble(true), 3000);
    const hide = setTimeout(() => setShowBubble(false), 12000);
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

  // スタッフ返信ポーリング
  useEffect(() => {
    if (!escalated) return;
    async function poll() {
      const since = lastStaffAt ?? '';
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
          setLastStaffAt(data.messages[data.messages.length - 1].sentAt);
        }
      } catch { /* ignore */ }
    }
    poll();
    pollRef.current = setInterval(poll, 5000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
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
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
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
        .chat-panel-enter  { animation: chat-slide-up  0.22s ease-out both; }
        .chat-float-enter  { animation: chat-float-in  0.4s ease-out both; }
        .chat-bubble-enter { animation: chat-bubble-in 0.3s 0.1s ease-out both; }
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
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0" style={{ backgroundColor: '#FFF5F2' }}>
              <AssistantAvatarSmall size={36} />
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
                placeholder={escalated ? '担当者からの返信をお待ちください' : 'メッセージを入力… (Enter で送信)'}
                disabled={loading || escalated}
                rows={1}
                className="flex-1 resize-none rounded-xl border border-slate-300 px-3 py-2.5 text-sm leading-6 outline-none disabled:bg-slate-50 disabled:text-slate-400 placeholder:text-slate-400 transition-colors"
                style={{ minHeight: '40px', maxHeight: '120px' }}
                onFocus={(e) => (e.target.style.borderColor = '#e04102')}
                onBlur={(e) => (e.target.style.borderColor = '')}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading || escalated}
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

      {/* ── フローティングトリガー（キャラクター + 吹き出し） ── */}
      {!open && (
        <div
          className="chat-float-enter fixed z-50 flex items-end gap-0"
          style={{ bottom: '0px', right: '16px' }}
        >
          {/* 吹き出し */}
          {showBubble && (
            <div
              className="chat-bubble-enter relative mb-12 mr-3 bg-white rounded-2xl shadow-lg border border-slate-200 px-4 py-3 whitespace-nowrap"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}
            >
              <p className="text-sm font-medium text-slate-700">お気軽にお問い合わせください</p>
              <p className="text-xs text-slate-400 mt-0.5">AIが24時間対応します</p>
              {/* 三角（右向き） */}
              <span
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  right: '-9px',
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderLeft: '9px solid white',
                  filter: 'drop-shadow(2px 0 1px rgba(0,0,0,0.06))',
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

          {/* キャラクターイラスト（クリックでチャット開く） */}
          <button
            onClick={() => setOpen(true)}
            className="flex-shrink-0 transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="チャットで問い合わせ"
            style={{ paddingBottom: '0px' }}
          >
            <AssistantCharacter width={96} height={148} />
          </button>
        </div>
      )}

      {/* チャットが開いているときの閉じるトリガー（右下隅の小さいボタン） */}
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
