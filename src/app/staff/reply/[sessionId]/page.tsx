'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

interface ChatEntry {
  role: 'staff' | 'visitor';
  content: string;
  sentAt: string;
}

export default function StaffReplyPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const sessionId = params.sessionId as string;
  const token = searchParams.get('token') ?? '';

  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [conversation, setConversation] = useState<ChatEntry[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastPollRef = useRef<string | null>(null);

  // 会話履歴のポーリング（5秒ごと）
  useEffect(() => {
    async function poll() {
      try {
        const res = await fetch(`/api/chat/poll?sessionId=${sessionId}&role=staff`, {
          cache: 'no-store',
        });
        const data = await res.json();

        const staffEntries: ChatEntry[] = (data.messages ?? []).map(
          (m: { content: string; sentAt: string }) => ({
            role: 'staff' as const,
            content: m.content,
            sentAt: m.sentAt,
          })
        );
        const visitorEntries: ChatEntry[] = (data.visitorMessages ?? []).map(
          (m: { content: string; sentAt: string }) => ({
            role: 'visitor' as const,
            content: m.content,
            sentAt: m.sentAt,
          })
        );

        // 時系列でソート
        const merged = [...staffEntries, ...visitorEntries].sort(
          (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
        );
        setConversation(merged);
      } catch {
        // ignore
      }
    }

    poll();
    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);
  }, [sessionId]);

  // 新着時に自動スクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleSend = async () => {
    if (!message.trim() || sending) return;
    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/staff/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: message.trim(), token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'エラーが発生しました');

      setSent(true);
      setMessage('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleString('ja-JP', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col" style={{ maxHeight: '90vh' }}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex-shrink-0" style={{ backgroundColor: '#1a2744' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: '#e04102' }}
            >
              Z
            </div>
            <div>
              <p className="text-white font-bold text-sm">ZEST スタッフ返信</p>
              <p className="text-slate-400 text-xs">訪問者との会話 — 5秒ごとに自動更新</p>
            </div>
          </div>
        </div>

        {/* 会話履歴 */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0">
          {conversation.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">
              まだメッセージはありません。訪問者からの返信を待っています。
            </p>
          ) : (
            conversation.map((entry, i) => (
              <div key={i} className={`flex ${entry.role === 'staff' ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-7 whitespace-pre-wrap break-words ${
                    entry.role === 'staff'
                      ? 'text-white rounded-tr-sm'
                      : 'bg-slate-100 text-slate-800 rounded-tl-sm'
                  }`}
                  style={entry.role === 'staff' ? { backgroundColor: '#1a2744' } : {}}
                >
                  <p className="text-xs mb-1 font-bold" style={{ color: entry.role === 'staff' ? '#F4A8A0' : '#e04102' }}>
                    {entry.role === 'staff' ? '担当者（あなた）' : '訪問者'}
                  </p>
                  {entry.content}
                  <p className="text-xs mt-1 opacity-60">{formatTime(entry.sentAt)}</p>
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {/* 返信フォーム */}
        <div className="flex-shrink-0 border-t border-slate-200 px-4 py-4">
          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-2 mb-3">{error}</p>
          )}
          {sent && (
            <p className="text-sm text-green-600 bg-green-50 rounded-lg px-4 py-2 mb-3">
              送信しました。訪問者のチャットに表示されます。
            </p>
          )}
          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
              }}
              onKeyDown={handleKeyDown}
              placeholder="訪問者への返信を入力… (Enter で送信)"
              rows={1}
              disabled={sending}
              className="flex-1 rounded-xl border border-slate-300 px-3 py-2.5 text-sm leading-6
                         outline-none resize-none disabled:opacity-50
                         placeholder:text-slate-400 transition-colors"
              style={{ minHeight: '40px', maxHeight: '120px' }}
              onFocus={(e) => (e.target.style.borderColor = '#e04102')}
              onBlur={(e) => (e.target.style.borderColor = '')}
            />
            <button
              onClick={handleSend}
              disabled={!message.trim() || sending}
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white
                         transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed
                         hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#e04102' }}
              aria-label="送信"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-slate-400 text-center mt-2">
            このページは担当者専用です。URLは第三者に共有しないでください。
          </p>
        </div>
      </div>
    </div>
  );
}
