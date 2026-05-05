'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

interface StaffMessage {
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
  const [history, setHistory] = useState<StaffMessage[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 過去のスタッフメッセージを取得
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/chat/poll?sessionId=${sessionId}`);
        const data = await res.json();
        if (data.messages) setHistory(data.messages);
      } catch {
        // ignore
      }
    }
    load();
  }, [sessionId]);

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
      setHistory((prev) => [
        ...prev,
        { content: message.trim(), sentAt: new Date().toISOString() },
      ]);
      setMessage('');
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setSending(false);
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200" style={{ backgroundColor: '#1a2744' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: '#e04102' }}
            >
              Z
            </div>
            <div>
              <p className="text-white font-bold text-sm">ZEST スタッフ返信</p>
              <p className="text-slate-400 text-xs">セッション ID: {sessionId?.slice(0, 8)}...</p>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-4">
          {/* 過去の返信履歴 */}
          {history.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-bold text-slate-500 mb-3">送信済みメッセージ</p>
              <div className="flex flex-col gap-2">
                {history.map((msg, i) => (
                  <div key={i} className="bg-white rounded-lg border border-slate-200 p-3">
                    <p className="text-sm text-slate-800 leading-6">{msg.content}</p>
                    <p className="text-xs text-slate-400 mt-1">{formatTime(msg.sentAt)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 返信フォーム */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              訪問者へのメッセージ
            </label>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="こちらに返信内容を入力してください..."
              rows={5}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm leading-7
                         outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                         resize-none placeholder:text-slate-400 transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-2">{error}</p>
          )}

          {sent && (
            <p className="text-sm text-green-600 bg-green-50 rounded-lg px-4 py-2">
              ✓ 送信しました。訪問者のチャットに表示されます。
            </p>
          )}

          <button
            onClick={handleSend}
            disabled={!message.trim() || sending}
            className="w-full py-3 rounded-xl font-bold text-white text-sm
                       transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed
                       hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#e04102' }}
          >
            {sending ? '送信中...' : '返信する'}
          </button>

          <p className="text-xs text-slate-400 text-center">
            このページは担当者専用です。URLは第三者に共有しないでください。
          </p>
        </div>
      </div>
    </div>
  );
}
