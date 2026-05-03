'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'サービス', href: '#', children: [
    { label: 'カチカタ', href: '/services/kachikata', desc: 'KFS特定・営業型化' },
    { label: 'SheetViz', href: '/services/sheetziv', desc: 'AppSheetベースCRM' },
    { label: 'インサイドセールス内製化', href: '/services/inside-sales', desc: '90日で自走するIS組織へ' },
  ]},
  { label: 'ブログ', href: '/blog' },
  { label: '会社概要', href: '/about' },
  { label: 'お問い合わせ', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="container-inner flex items-center justify-between h-16">
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
                  className="flex items-center gap-1 text-sm font-medium text-slate-700
                             hover:text-brand-orange transition-colors"
                  onClick={() => setServicesOpen(!servicesOpen)}
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
                className="text-sm font-medium text-slate-700 hover:text-brand-orange
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
