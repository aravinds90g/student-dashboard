'use client';

import { motion } from 'framer-motion';
import { BookOpen, Globe, Code, Zap, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Globe,
  Code,
  Zap,
};

interface CourseTileProps {
  title: string;
  progress: number;
  iconName: string;
  index: number;
}

export default function CourseTile({ title, progress, iconName, index }: CourseTileProps) {
  const Icon = iconMap[iconName] ?? BookOpen;
  const isComplete = progress === 100;

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.04] p-4 bg-white/[0.02] group/course"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
      <div className="flex items-start gap-3 relative z-10">
        <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
          isComplete
            ? 'bg-emerald-500/15 text-emerald-400'
            : 'bg-orange-500/15 text-orange-400'
        }`}>
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white truncate">{title}</p>
          {isComplete && (
            <span className="text-[10px] text-emerald-400 font-medium">Done</span>
          )}
        </div>
        <span className={`text-sm font-bold shrink-0 ${
          isComplete ? 'text-emerald-400' : 'bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent'
        }`}>
          {progress}%
        </span>
      </div>

      <div className="w-full h-1 rounded-full bg-white/[0.06] mt-3 relative z-10">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: index * 0.08 + 0.3 }}
          className={`h-full rounded-full origin-left ${isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-orange-500 to-emerald-500'}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-24 rounded-full blur-[40px] pointer-events-none transition-all duration-500 ${
        isComplete ? 'bg-emerald-600/20' : 'bg-orange-600/15'
      }`} />
    </motion.article>
  );
}
