'use client';

import { LayoutDashboard, BookOpen, ClipboardList, Award, Users, Settings, LogOut, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { SidebarTab } from '../types';
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

interface SidebarProps {
  activeTab: SidebarTab;
  setActiveTab: (tab: SidebarTab) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs: { id: SidebarTab; icon: LucideIcon; label: string }[] = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'courses', icon: BookOpen, label: 'Courses' },
    { id: 'assignments', icon: ClipboardList, label: 'Assignments' },
    { id: 'certificates', icon: Award, label: 'Certificates' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="hidden md:flex w-20 md:w-24 shrink-0 flex-col items-center justify-between py-6 h-full text-foreground select-none border-r border-border/50" id="sidebar-container">
      <motion.div
        className="w-14 h-14 bg-card rounded-full flex items-center justify-center border border-border shadow-lg cursor-pointer relative group overflow-hidden mb-8"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        id="logo-badge"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-[#FF6A00]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <GraduationCap className="w-7 h-7 text-[#FF6A00] group-hover:text-white transition-colors duration-300" strokeWidth={1.8} />
      </motion.div>

      <div
        className="w-14 bg-card rounded-full py-4 flex flex-col items-center gap-5 shadow-md border border-border relative"
        id="navigation-track"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <div key={tab.id} className="relative group flex items-center">
              <button
                onClick={() => setActiveTab(tab.id)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative z-10"
                title={tab.label}
                id={`sidebar-tab-${tab.id}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-[#FF6A00] rounded-full shadow-[0_0_12px_rgba(255,106,0,0.4)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
                <Icon
                  className={`w-5 h-5 transition-all duration-300 relative z-20 ${isActive
                      ? 'text-white scale-110'
                      : 'text-muted-foreground group-hover:text-[#FF6A00] group-hover:scale-105'
                    }`}
                  strokeWidth={2}
                />
              </button>

              <div className="absolute left-16 px-3 py-1.5 opacity-0 pointer-events-none group-hover:opacity-100 bg-[#FF6A00] text-white text-xs font-medium rounded-lg shadow-xl translate-x-1.5 group-hover:translate-x-3 transition-all duration-300 z-50 whitespace-nowrap">
                {tab.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-5 mt-auto" id="sidebar-bottom-actions">
        <motion.button
          className="w-10 h-10 rounded-full bg-card hover:bg-[#FF6A00] active:bg-[#cc5500] flex items-center justify-center transition-colors shadow-sm group border border-border"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Sign Out"
          id="logout-btn"
        >
          <LogOut className="w-4.5 h-4.5 text-muted-foreground group-hover:text-white transition-colors" />
        </motion.button>

        <motion.div
          className="w-12 h-12 rounded-full border-2 border-[#FF6A00] overflow-hidden shadow-lg cursor-pointer select-none relative"
          whileHover={{ scale: 1.05 }}
          title="User Account"
          id="profile-avatar"
        >
          <Image
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80"
            alt="User profile"
            className="w-full h-full object-cover"
            width={48}
            height={48}
            referrerPolicy="no-referrer"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full"></span>
        </motion.div>
      </div>
    </aside>
  );
}
