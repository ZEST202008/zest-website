'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

// ────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// ────────────────────────────────────────────────────────────────
// Icons (inline SVG — no extra dependencies)
// ────────────────────────────────────────────────────────────────
function IconChat() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
// Greeting message shown on first open
// ────────────────────────────────────────────────────────────────
const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content:
    'こんにちは！株式会社ZESTのAIアシスタントです。サービスや料金、導入事例など、お気軽にご質問ください。',
};

// ────────────────────────────────────────────────────────────────
// Bubble component
// ────────────────────────────────────────────────────────────────
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      {!isUser && (
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: '#e04102' }}
        >
          Z
        </div>
      )}
      {/* Bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-7 whitespace-pre-wrap break-words ${
          isUser
            ? 'text-white rounded-tr-sm'
            : 'bg-slate-100 text-slate-800 rounded-tl-sm'
        }`}
        style={isUser ? { backgroundColor: '#e04102' } : {}}
      >
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
    <div className="flex gap-2 flex-row">
      <div
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
        style={{ backgroundColor: '#e04102' }}
      >
        Z
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
// Main widget
// ────────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading || escalated) return;

    const userMsg: Message = { role: 'user', content: text };
    const nextMessages = [...messages, userMsg];

    setMessages(nextMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'エラーが発生しました。');
      }

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
  }, [input, loading, escalated, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-resize textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <>
      {/* Bounce animation */}
      <style>{`
        @keyframes chat-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        @keyframes chat-slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        .chat-panel-enter {
          animation: chat-slide-up 0.22s ease-out forwards;
        }
      `}</style>

      {/* ── Chat Panel ── */}
      {open && (
        <div
          className="chat-panel-enter fixed bottom-24 right-5 z-50 w-[360px] max-w-[calc(100vw-2.5rem)]
                     bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden
                     border border-slate-200"
          style={{ height: '520px' }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 text-white flex-shrink-0"
            style={{ backgroundColor: '#1a2744' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: '#e04102' }}
            >
              Z
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold leading-tight">ZEST AIアシスタント</p>
              <p className="text-xs text-slate-300 leading-tight">お気軽にご質問ください</p>
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
              <p className="text-xs text-slate-500 text-center bg-slate-100 rounded-xl px-3 py-2">
                担当者に引き継ぎました。1営業日以内にご連絡いたします。
              </p>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div className="flex-shrink-0 border-t border-slate-200 px-3 py-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder={
                  escalated
                    ? 'このチャットは終了しました'
                    : 'メッセージを入力… (Enter で送信)'
                }
                disabled={loading || escalated}
                rows={1}
                className="flex-1 resize-none rounded-xl border border-slate-300
                           px-3 py-2.5 text-sm leading-6 outline-none
                           focus:border-brand-orange focus:ring-1 focus:ring-brand-orange
                           disabled:bg-slate-50 disabled:text-slate-400
                           placeholder:text-slate-400 transition-colors"
                style={{ minHeight: '40px', maxHeight: '120px' }}
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

      {/* ── Floating Button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full shadow-lg
                   flex items-center justify-center text-white
                   transition-all duration-200 hover:scale-105 active:scale-95"
        style={{ backgroundColor: '#e04102' }}
        aria-label={open ? 'チャットを閉じる' : 'チャットで問い合わせ'}
      >
        {open ? <IconClose /> : <IconChat />}
      </button>
    </>
  );
}
