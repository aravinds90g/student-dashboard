'use client';

import { motion } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle2, FileText } from 'lucide-react';
import type { Assignment } from '@/types';

interface AssignmentCardProps {
  assignment: Assignment;
  index: number;
  onSelect: (a: Assignment) => void;
}

const statusConfig = {
  pending: { label: 'Pending', class: 'bg-orange-500/20 text-orange-400' },
  submitted: { label: 'Submitted', class: 'bg-blue-500/20 text-blue-400' },
  graded: { label: 'Graded', class: 'bg-emerald-500/20 text-emerald-400' },
  overdue: { label: 'Overdue', class: 'bg-red-500/20 text-red-400' },
};

function getDaysRemaining(dateStr: string): number {
  const now = new Date();
  const due = new Date(dateStr);
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function AssignmentCard({ assignment, index, onSelect }: AssignmentCardProps) {
  const daysLeft = getDaysRemaining(assignment.dueDate);
  const statusInfo = statusConfig[assignment.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.25, 1, 0.5, 1] }}
      className="relative group cursor-pointer"
      onClick={() => onSelect(assignment)}
    >
      <div className="rounded-2xl border border-white/10 bg-card p-5 h-full hover:border-orange-500/30 transition-colors duration-300">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-0.5" />
            <span className="text-[10px] uppercase font-bold tracking-[0.1em] text-zinc-500 truncate">
              {assignment.courseName}
            </span>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusInfo.class}`}>
            {statusInfo.label}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-white leading-snug mb-1.5 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-orange-500 group-hover:bg-clip-text transition-all duration-300">
          {assignment.title}
        </h3>

        <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-2 mb-4">
          {assignment.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
              assignment.difficulty === 'Easy' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' :
              assignment.difficulty === 'Medium' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' :
              'text-rose-400 border-rose-500/20 bg-rose-500/10'
            }`}>
              {assignment.difficulty}
            </span>
            <span className="text-[10px] text-zinc-600 flex items-center gap-1">
              <FileText size={10} />
              {assignment.estimatedHours}h
            </span>
          </div>

          <div className={`flex items-center gap-1 text-[10px] font-medium ${
            assignment.status === 'overdue' ? 'text-red-400' :
            assignment.status === 'graded' ? 'text-emerald-400' :
            daysLeft <= 2 ? 'text-orange-400' : 'text-zinc-500'
          }`}>
            {assignment.status === 'graded' ? (
              <><CheckCircle2 size={10} /> {assignment.scoredPoints}/{assignment.maxPoints}</>
            ) : assignment.status === 'overdue' ? (
              <><AlertCircle size={10} /> Overdue</>
            ) : (
              <><Clock size={10} /> {daysLeft}d left</>
            )}
          </div>
        </div>

        {assignment.status === 'graded' && assignment.scoredPoints !== undefined && (
          <div className="w-full h-1 rounded-full bg-zinc-800 overflow-hidden mt-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(assignment.scoredPoints / assignment.maxPoints) * 100}%` }}
              transition={{ duration: 1, delay: 0.3 + index * 0.07, ease: [0.25, 1, 0.5, 1] }}
              className={`h-full rounded-full ${
                (assignment.scoredPoints / assignment.maxPoints) >= 0.8 ? 'bg-emerald-500' :
                (assignment.scoredPoints / assignment.maxPoints) >= 0.6 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
