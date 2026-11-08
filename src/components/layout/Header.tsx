'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'サービス', href: '#', children: [
    { label: 'カチカタ', href: '/services/kachikata', desc: 'KFS特定・営業型化' },
    { label: 'SheetViz', href: '/services/sheetziv', desc: 'Google SheetsベースCRM' },
    { label: 'インサイドセールス内製化', href: '/services/inside-sales', desc: '90日で自走するIS組織へ' },
    { label: 'AIチャットアシスタント', href: '/services/ai-chat-assistant', desc: '見えない機会損失を商談機会へ' },
  ]},
  { label: 'ブログ', href: '/blog' },
  { label: '会社概要', href: '/about' },
  { label: 'お問い合わせ', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 少しスクロールしたらヘッダーを薄く縮め、本文との境界をはっきりさせる
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled ? 'border-slate-200 shadow-[0_4px_20px_-12px_rgba(26,39,68,0.3)]' : 'border-transparent'
      }`}
    >
      <div
        className={`container-inner flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-14' : 'h-16'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center no-underline">
          <Image
            src="/zest-logo.png"
            alt="ZEST"
            width={100}
            height={36}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <button
                  className="nav-link flex items-center gap-1 text-sm font-medium text-slate-700
                             hover:text-brand-orange transition-colors"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                >
                  {item.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 8L1 3h10z"/>
                  </svg>
                </button>
                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl
                                border border-slate-200 shadow-lg opacity-0 invisible
                                group-hover:opacity-100 group-hover:visible transition-all
                                duration-200 p-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-3 py-2 rounded-lg hover:bg-slate-50 no-underline"
                    >
                      <div className="text-sm font-bold text-slate-800">{child.label}</div>
                      <div className="text-xs text-slate-500">{child.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="nav-link text-sm font-medium text-slate-700 hover:text-brand-orange
                           transition-colors no-underline"
              >
                {item.label}
              </Link>
            )
          )}
          <Link href="/contact" className="btn-primary text-sm px-4 py-2">
            無料相談を予約
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-slate-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-3">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.label}>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                  {item.label}
                </div>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block py-2 text-sm text-slate-700 hover:text-brand-orange no-underline"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="block py-2 text-sm text-slate-700 hover:text-brand-orange no-underline"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
          <Link href="/contact" className="btn-primary w-full justify-center mt-4">
            無料相談を予約
          </Link>
        </div>
      )}
    </header>
  );
}
