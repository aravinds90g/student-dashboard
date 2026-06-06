'use client';

import { motion } from 'framer-motion';
import { Award, Calendar } from 'lucide-react';
import type { Certificate } from '@/types';

interface CertificateCardProps {
  cert: Certificate;
  index: number;
  onSelect: (c: Certificate) => void;
}

const gradeColor = (grade: string) => {
  const num = parseInt(grade);
  if (num >= 90) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
  if (num >= 80) return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
  return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
};

export default function CertificateCard({ cert, index, onSelect }: CertificateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
      className="relative group cursor-pointer"
      onClick={() => onSelect(cert)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card h-full hover:border-emerald-500/30 transition-colors duration-300">
        <div className="relative h-36 overflow-hidden bg-gradient-to-br from-zinc-800/50 to-zinc-900/50">
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center">
              <Award size={14} className="text-emerald-400" />
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border backdrop-blur-sm ${gradeColor(cert.grade)}`}>
              {cert.grade}
            </span>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-emerald-400 group-hover:bg-clip-text transition-all duration-300">
              {cert.title}
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">{cert.instructor}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
              <Calendar size={10} />
              {new Date(cert.issuedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <span className="text-[10px] text-zinc-600">{cert.hoursSpent}h spent</span>
          </div>

          <div className="pt-1 border-t border-white/[0.04]">
            <span className="text-[9px] uppercase font-bold tracking-[0.1em] text-zinc-600">
              ID: {cert.credentialId}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
