import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Target, BarChart2, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'カチカタ | KFS特定・営業の型化',
  description: 'トップセールスの行動データを解析し、組織全体で再現できるセンターピン（KFS）を特定。誰もが成果を出せる営業の型を作ります。',
};

export default function KachikataPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-bg border-b border-slate-200 py-20">
        <div className="container-inner">
          <span className="section-label">Service</span>
          <div className="flex items-center gap-4 mb-4">
            <Image src="/kachikata-logo.png" alt="カチカタ" width={200} height={60} className="h-14 w-auto object-contain" />
          </div>
          <p className="text-xl text-brand-orange font-bold mb-6">
            「勝ち」と「価値」を型化する、KFS特定サービス
          </p>
          <p className="text-slate-600 leading-relaxed max-w-2xl mb-8">
            トップセールスの行動パターンをデータで解析し、誰もが再現できる
            「センターピン（KFS：Key Factor for Success）」を特定。
            営業の型をSheetVizに書き戻し、現場で活用できる形にします。
          </p>
          <Link href="/contact" className="btn-primary">
            <ArrowRight size={18} /> 無料相談を予約する
          </Link>
        </div>
      </section>

      {/* KFSとは */}
      <section className="py-20">
        <div className="container-inner max-w-3xl">
          <span className="section-label">KFSとは</span>
          <h2 className="section-title">センターピンを倒せば、他のピンが連鎖する</h2>
          <p className="section-sub mb-8">
            ボウリングのセンターピンのように、営業にも「これさえ押さえれば成果が出る」
            という核心的な行動・要素が必ず存在します。
            カチカタはそれをデータから特定し、組織の標準行動にします。
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <BarChart2 size={20} className="text-brand-orange" />, step: '01', title: 'データ収集・分析', desc: 'SheetVizに蓄積された商談データからトップセールスの行動パターンを解析' },
              { icon: <Target size={20} className="text-brand-orange" />, step: '02', title: 'KFS特定', desc: '成果と相関の高い「センターピン行動」をスコアリングし明文化' },
              { icon: <Users size={20} className="text-brand-orange" />, step: '03', title: '組織展開', desc: 'KFSをSheetVizのKPI・チェックリストに書き戻し、全員が実践できる型に' },
            ].map((item) => (
              <div key={item.step} className="card">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xs font-black text-brand-orange">STEP {item.step}</span>
                </div>
                <h3 className="font-black text-brand-navy mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy py-16">
        <div className="container-inner text-center">
          <h2 className="text-2xl font-black text-white mb-4">
            まずは現状のヒアリングから
          </h2>
          <p className="text-slate-400 mb-6 text-sm">
            SheetVizの導入有無に関わらずご相談いただけます。
          </p>
          <Link href="/contact" className="btn-primary">
            <ArrowRight size={18} /> 無料相談を予約する
          </Link>
        </div>
      </section>
    </>
  );
}
