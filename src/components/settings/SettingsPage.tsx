'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Trash2, ChevronRight, Mail, Clock, BookOpen, BarChart3, CircleCheck } from 'lucide-react';
import BorderGlow from '@/components/BorderGlow';

const preferences = [
  { id: 'digest', label: 'Weekly Email Digest', description: 'Receive a summary of your progress every Monday', icon: Mail, defaultOn: true },
  { id: 'reminders', label: 'Assignment Reminders', description: 'Get notified 24h before a deadline', icon: Clock, defaultOn: true },
  { id: 'updates', label: 'Course Updates', description: 'New modules, live sessions, and announcements', icon: BookOpen, defaultOn: false },
  { id: 'reports', label: 'Monthly Progress Reports', description: 'Detailed performance analytics via email', icon: BarChart3, defaultOn: true },
];

export default function SettingsPage() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(preferences.map(p => [p.id, p.defaultOn]))
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage your account and preferences</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <BorderGlow
          edgeSensitivity={1}
          glowColor="10 100 90"
          backgroundColor="#070608"
          borderRadius={15}
          glowRadius={1}
          glowIntensity={1}
          coneSpread={3}
          animated
          colors={['#FF6A00', '#FF8C00', '#FFA500']}
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-1">
              <User size={14} className="text-orange-500" />
              <h2 className="text-sm font-semibold text-white">Profile</h2>
            </div>
            <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-zinc-600 mb-5">Personal Information</p>

            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-xl font-bold text-white shrink-0">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-white">Aravind S</p>
                <p className="text-sm text-zinc-400">aravind.s@example.com</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[10px] text-zinc-600 bg-white/[0.03] px-2 py-0.5 rounded-full">Student</span>
                  <span className="text-[10px] text-zinc-600">Member since Jan 2025</span>
                </div>
              </div>
              <button className="text-xs text-orange-500 hover:text-orange-400 transition-colors shrink-0 flex items-center gap-1">
                Edit <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </BorderGlow>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.08 }}
      >
        <BorderGlow
          edgeSensitivity={1}
          glowColor="10 100 90"
          backgroundColor="#070608"
          borderRadius={15}
          glowRadius={1}
          glowIntensity={1}
          coneSpread={3}
          animated
          colors={['#FF6A00', '#FF8C00', '#FFA500']}
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-1">
              <Bell size={14} className="text-orange-500" />
              <h2 className="text-sm font-semibold text-white">Notifications</h2>
            </div>
            <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-zinc-600 mb-5">Preference Controls</p>

            <div className="space-y-4">
              {preferences.map((pref, i) => {
                const Icon = pref.icon;
                return (
                  <motion.div
                    key={pref.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-zinc-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-white">{pref.label}</p>
                        <p className="text-[11px] text-zinc-500">{pref.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setToggles(prev => ({ ...prev, [pref.id]: !prev[pref.id] }))}
                      className={`relative w-10 h-5 rounded-full transition-colors duration-300 shrink-0 ${
                        toggles[pref.id] ? 'bg-orange-500' : 'bg-zinc-700'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                          toggles[pref.id] ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </BorderGlow>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.16 }}
        >
          <BorderGlow
            edgeSensitivity={1}
            glowColor="10 100 90"
            backgroundColor="#070608"
            borderRadius={15}
            glowRadius={1}
            glowIntensity={1}
            coneSpread={3}
            animated
            colors={['#FF6A00', '#FF8C00', '#FFA500']}
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <Shield size={14} className="text-orange-500" />
                <h2 className="text-sm font-semibold text-white">Account</h2>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-zinc-600 mb-5">Plan & Security</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-zinc-300">Current Plan</span>
                  <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-orange-500/20 text-orange-400">Pro</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-zinc-300">Password</span>
                  <span className="text-xs text-zinc-500">Last changed 3 months ago</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-zinc-300">Two-Factor Auth</span>
                  <span className="text-[10px] flex items-center gap-1 text-emerald-400">
                    <CircleCheck size={10} /> Enabled
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-zinc-300">Sessions</span>
                  <span className="text-xs text-zinc-500">2 active devices</span>
                </div>
              </div>
            </div>
          </BorderGlow>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <BorderGlow
            edgeSensitivity={1}
            glowColor="10 100 90"
            backgroundColor="#070608"
            borderRadius={15}
            glowRadius={1}
            glowIntensity={1}
            coneSpread={3}
            animated
            colors={['#FF6A00', '#FF8C00', '#FFA500']}
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <Trash2 size={14} className="text-red-500" />
                <h2 className="text-sm font-semibold text-white">Danger Zone</h2>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-zinc-600 mb-5">Irreversible Actions</p>

              <div className="space-y-3">
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Once you delete your account, there is no going back. All your courses, certificates, and data will be permanently removed.
                </p>
                <button className="w-full py-2.5 rounded-xl border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </BorderGlow>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.24 }}
        className="text-center pb-8"
      >
        <p className="text-[10px] text-zinc-700">
          Student Dashboard v1.0 &middot; Built with Next.js, Tailwind CSS &amp; Framer Motion
        </p>
      </motion.div>
    </div>
  );
}
