'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, AlertCircle, CheckCircle2, FileText, BarChart3 } from 'lucide-react';
import { assignments } from '@/data/assignments';
import AssignmentCard from './AssignmentCard';
import BorderGlow from '@/components/BorderGlow';
import type { Assignment } from '@/types';

const statusConfig = {
  pending: { label: 'Pending', class: 'bg-orange-500/20 text-orange-400 border-orange-500/20' },
  submitted: { label: 'Submitted', class: 'bg-blue-500/20 text-blue-400 border-blue-500/20' },
  graded: { label: 'Graded', class: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' },
  overdue: { label: 'Overdue', class: 'bg-red-500/20 text-red-400 border-red-500/20' },
};

function getDaysRemaining(dateStr: string): number {
  const now = new Date();
  const due = new Date(dateStr);
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function AssignmentsPage() {
  const [selected, setSelected] = useState<Assignment | null>(null);

  const stats = [
    { value: assignments.length, label: 'Total Assignments', icon: FileText },
    { value: assignments.filter(a => a.status === 'pending').length, label: 'Pending', icon: Clock },
    { value: assignments.filter(a => a.status === 'graded').length, label: 'Graded', icon: CheckCircle2 },
    { value: assignments.filter(a => a.status === 'overdue').length, label: 'Overdue', icon: AlertCircle },
  ];

  if (selected) {
    const a = selected;
    const daysLeft = getDaysRemaining(a.dueDate);
    const scorePct = a.scoredPoints !== undefined ? (a.scoredPoints / a.maxPoints) * 100 : 0;
    const sinfo = statusConfig[a.status];

    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 text-sm"
        >
          <ArrowLeft size={16} />
          Back to Assignments
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
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-[0.1em] text-zinc-500 bg-white/[0.04] px-2 py-1 rounded-full">
                    {a.courseName}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${sinfo.class}`}>
                    {sinfo.label}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">{a.title}</h1>
                <p className="text-sm text-zinc-400 leading-relaxed">{a.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                <FileText size={12} />
                Est. {a.estimatedHours} hours
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                a.difficulty === 'Easy' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' :
                a.difficulty === 'Medium' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' :
                'text-rose-400 border-rose-500/20 bg-rose-500/10'
              }`}>
                {a.difficulty}
              </span>
              <div className={`flex items-center gap-1.5 text-xs ${
                a.status === 'overdue' ? 'text-red-400' : 'text-orange-400'
              }`}>
                <Clock size={12} />
                Due {new Date(a.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                {a.status !== 'graded' && a.status !== 'overdue' && (
                  <span className="text-zinc-500">({daysLeft} days left)</span>
                )}
              </div>
            </div>

            {a.status === 'overdue' && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-6">
                <AlertCircle size={14} className="text-red-400 shrink-0" />
                <span className="text-xs text-red-300">This assignment is overdue. Please submit as soon as possible.</span>
              </div>
            )}

            {a.status === 'graded' && a.scoredPoints !== undefined && (
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Score</span>
                  <span className={`text-sm font-bold ${
                    scorePct >= 80 ? 'text-emerald-400' : scorePct >= 60 ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {a.scoredPoints}/{a.maxPoints} ({Math.round(scorePct)}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${scorePct}%` }}
                    transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                    className={`h-full rounded-full ${
                      scorePct >= 80 ? 'bg-emerald-500' : scorePct >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                  />
                </div>
              </div>
            )}

            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300">
              {a.status === 'graded' ? 'View Submission' : a.status === 'submitted' ? 'View Submission' : 'Submit Assignment'}
            </button>
          </div>
        </BorderGlow>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Assignments</h1>
        <p className="text-sm text-zinc-500 mt-1">{assignments.length} assignments total</p>
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
            <stat.icon size={14} className="text-orange-500 mb-2" />
            <span className="block text-xl font-bold text-white">{stat.value}</span>
            <span className="block text-[10px] uppercase font-bold tracking-[0.15em] text-zinc-500 mt-0.5">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {assignments.map((a, i) => (
            <AssignmentCard key={a.id} assignment={a} index={i} onSelect={setSelected} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
