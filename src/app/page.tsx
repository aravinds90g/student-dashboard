'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import BentoGridSecondDemo from '@/components/bento-grid-demo-2';
import type { SidebarTab } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<SidebarTab>('dashboard');

  return (
    <>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 overflow-auto">
        {activeTab === 'dashboard' ? (
          <BentoGridSecondDemo />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500">
            <p className="text-sm capitalize">{activeTab} — Coming soon</p>
          </div>
        )}
      </main>
    </>
  );
}
