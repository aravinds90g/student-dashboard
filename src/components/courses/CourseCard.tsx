'use client';

import { motion } from 'framer-motion';
import type { Course } from '@/types';

interface CourseCardProps {
  course: Course;
  index: number;
  onSelect: (course: Course) => void;
}

export default function CourseCard({ course, index, onSelect }: CourseCardProps) {
  const isComplete = course.progress === 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
      className="relative group cursor-pointer"
      onClick={() => onSelect(course)}
    >
      <div className="relative group overflow-hidden rounded-2xl border border-white/10 h-64">
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute top-3 right-4 z-10 flex items-center gap-2">
          {isComplete && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
              Done
            </span>
          )}
          <span className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
            isComplete ? 'from-white to-emerald-400' : 'from-white to-orange-500'
          }`}>
            {course.title}
          </span>
        </div>

        <div className="absolute bottom-3 left-4 z-10">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-7xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
              isComplete ? 'from-white to-emerald-400' : 'from-white to-orange-500'
            }`}>
              {course.progress}
            </span>
            <span className="text-[10px] text-zinc-500 font-medium">%</span>
          </div>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 max-w-[55%]">
          <div className="space-y-2.5 text-right">
            <p className="text-[11px] text-zinc-500 mt-0.5">{course.instructor}</p>
            <div className="flex flex-wrap gap-1.5 justify-end">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                course.difficulty === 'Beginner' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' :
                course.difficulty === 'Intermediate' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' :
                'text-rose-400 border-rose-500/20 bg-rose-500/10'
              }`}>
                {course.difficulty}
              </span>
              <span className="text-[10px] text-zinc-600 bg-white/[0.03] px-2 py-0.5 rounded-full">
                {course.completedModules}/{course.totalModules}
              </span>
            </div>
            <div className="w-full h-1 rounded-full bg-zinc-800 overflow-hidden mt-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: [0.25, 1, 0.5, 1] }}
                className={`h-full rounded-full ${isComplete ? 'bg-emerald-500' : 'bg-orange-500'}`}
              />
            </div>
          </div>
        </div>

        <div className={`absolute -bottom-16 left-1/2 -translate-x-1/2 w-4/5 h-32 rounded-full blur-[60px] pointer-events-none transition-all duration-500 group-hover:blur-[50px] ${
          isComplete
            ? 'bg-emerald-600/20 group-hover:bg-emerald-500/30'
            : 'bg-orange-600/20 group-hover:bg-orange-500/30'
        }`} />
      </div>
    </motion.div>
  );
}
