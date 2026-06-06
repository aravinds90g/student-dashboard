'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Award, Calendar, BarChart3, Clock } from 'lucide-react';
import { certificates } from '@/data/certificates';
import CertificateCard from './CertificateCard';
import BorderGlow from '@/components/BorderGlow';
import type { Certificate } from '@/types';

function avgGrade(certs: Certificate[]): string {
  const nums = certs.map(c => parseInt(c.grade));
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
  return `${Math.round(avg)}%`;
}

export default function CertificatesPage() {
  const [selected, setSelected] = useState<Certificate | null>(null);

  const stats = [
    { value: certificates.length, label: 'Total Earned', icon: Award },
    { value: certificates.length, label: 'Active Credentials', icon: BarChart3 },
    { value: avgGrade(certificates), label: 'Average Grade', icon: BarChart3 },
    { value: certificates.reduce((s, c) => s + c.hoursSpent, 0), label: 'Total Hours', icon: Clock, suffix: 'h' },
  ];

  if (selected) {
    const c = selected;
    const gradeNum = parseInt(c.grade);

    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 text-sm"
        >
          <ArrowLeft size={16} />
          Back to Certificates
        </button>

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
            <div className="flex items-start gap-6">
              <div className="w-48 h-32 rounded-xl overflow-hidden shrink-0 relative bg-gradient-to-br from-zinc-800/50 to-zinc-900/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award size={32} className="text-emerald-400" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-[0.15em] px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                    Earned
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${
                    gradeNum >= 90 ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' :
                    gradeNum >= 80 ? 'text-blue-400 border-blue-500/20 bg-blue-500/10' :
                    'text-amber-400 border-amber-500/20 bg-amber-500/10'
                  }`}>
                    {c.grade}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">{c.title}</h1>
                <p className="text-sm text-zinc-400 mb-1">{c.instructor}</p>
                <p className="text-xs text-zinc-500">{c.courseName}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Grade</span>
                <span className="text-sm font-bold text-emerald-400">{c.grade}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${gradeNum}%` }}
                  transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                  className={`h-full rounded-full ${
                    gradeNum >= 90 ? 'bg-emerald-500' : gradeNum >= 80 ? 'bg-blue-500' : 'bg-amber-500'
                  }`}
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <Calendar size={14} className="text-zinc-500 mb-2" />
                <p className="text-[10px] uppercase font-bold tracking-[0.1em] text-zinc-600 mb-1">Issued</p>
                <p className="text-sm text-white">
                  {new Date(c.issuedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <BarChart3 size={14} className="text-zinc-500 mb-2" />
                <p className="text-[10px] uppercase font-bold tracking-[0.1em] text-zinc-600 mb-1">Credential ID</p>
                <p className="text-sm text-white font-mono">{c.credentialId}</p>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <Clock size={14} className="text-zinc-500 mb-2" />
              <p className="text-[10px] uppercase font-bold tracking-[0.1em] text-zinc-600 mb-1">Time Spent</p>
              <p className="text-sm text-white">{c.hoursSpent} hours</p>
            </div>
          </div>
        </BorderGlow>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Certificates</h1>
        <p className="text-sm text-zinc-500 mt-1">{certificates.length} credentials earned</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="rounded-2xl border border-white/10 bg-card p-4"
          >
            <stat.icon size={14} className="text-emerald-500 mb-2" />
            <span className="block text-xl font-bold text-white">
              {stat.value}{stat.suffix || ''}
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-[0.15em] text-zinc-500 mt-0.5">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {certificates.map((c, i) => (
            <CertificateCard key={c.id} cert={c} index={i} onSelect={setSelected} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
