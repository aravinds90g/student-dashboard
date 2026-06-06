'use client';

import { useState } from 'react';
import {
  LayoutDashboard, BookOpen, ClipboardList, Award, Users, Settings,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import BentoGridSecondDemo from '@/components/bento-grid-demo-2';
import CoursesPage from '@/components/courses/CoursesPage';
import AssignmentsPage from '@/components/assignments/AssignmentsPage';
import CertificatesPage from '@/components/certificates/CertificatesPage';
import SettingsPage from '@/components/settings/SettingsPage';
import type { SidebarTab, DashboardData } from '@/types';

interface Props {
  dashboardData: DashboardData;
}

const bottomNavTabs: { id: SidebarTab; icon: typeof LayoutDashboard; label: string }[] = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'courses', icon: BookOpen, label: 'Courses' },
  { id: 'assignments', icon: ClipboardList, label: 'Assignments' },
  { id: 'certificates', icon: Award, label: 'Certificates' },
  { id: 'community', icon: Users, label: 'Community' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function HomeClient({ dashboardData }: Props) {
  const [activeTab, setActiveTab] = useState<SidebarTab>('dashboard');

  return (
    <>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 overflow-auto pb-20 md:pb-6">
        {activeTab === 'dashboard' ? (
          <BentoGridSecondDemo dashboardData={dashboardData} />
        ) : activeTab === 'courses' ? (
          <CoursesPage />
        ) : activeTab === 'assignments' ? (
          <AssignmentsPage />
        ) : activeTab === 'certificates' ? (
          <CertificatesPage />
        ) : activeTab === 'settings' ? (
          <SettingsPage />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500">
            <p className="text-sm capitalize">{activeTab} — Coming soon</p>
          </div>
        )}
      </main>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-t border-border/50">
        <div className="flex items-center justify-around py-2 px-1">
          {bottomNavTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-colors ${
                  isActive ? 'text-[#FF6A00]' : 'text-zinc-500'
                }`}
              >
                <Icon size={18} className={isActive ? 'scale-110' : ''} />
                <span className={`text-[9px] font-semibold uppercase tracking-wider ${
                  isActive ? 'text-[#FF6A00]' : 'text-zinc-500'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
