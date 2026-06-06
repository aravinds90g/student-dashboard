'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Award, BookOpen, BarChart3 } from 'lucide-react';
import { courses } from '@/data/courses';
import CourseCard from './CourseCard';
import BorderGlow from '@/components/BorderGlow';
import type { Course } from '@/types';

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const stats = [
    { value: courses.length, label: 'Total Courses', icon: BookOpen },
    { value: courses.filter(c => c.status === 'in-progress').length, label: 'In Progress', icon: Clock },
    { value: courses.filter(c => c.status === 'completed').length, label: 'Completed', icon: Award },
    { value: courses.reduce((sum, c) => sum + c.hoursSpent, 0), label: 'Total Hours', icon: BarChart3, suffix: 'h' },
  ];

  if (selectedCourse) {
    const c = selectedCourse;
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedCourse(null)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 text-sm"
        >
          <ArrowLeft size={16} />
          Back to Courses
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
              <div className="w-48 h-32 rounded-xl overflow-hidden shrink-0 relative">
                <img src={c.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-[0.15em] px-2 py-1 rounded-full bg-white/10 text-zinc-300">
                    {c.category}
                  </span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                    c.difficulty === 'Beginner' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' :
                    c.difficulty === 'Intermediate' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' :
                    'text-rose-400 border-rose-500/20 bg-rose-500/10'
                  }`}>
                    {c.difficulty}
                  </span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    c.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                    c.status === 'in-progress' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-zinc-500/20 text-zinc-400'
                  }`}>
                    {c.status === 'completed' ? 'Completed' : c.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">{c.title}</h1>
                <p className="text-sm text-zinc-400">{c.instructor}</p>

                {c.nextDeadline && (
                  <p className="text-xs text-orange-400 mt-2 flex items-center gap-1.5">
                    <Clock size={12} />
                    Due {new Date(c.nextDeadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Progress</span>
                <span className="text-xs font-semibold text-zinc-300">{c.progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.progress}%` }}
                  transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                  className={`h-full rounded-full bg-gradient-to-r ${c.color}`}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>{c.completedModules} of {c.totalModules} modules completed</span>
                <span>{c.hoursSpent}h total spent</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {Array.from({ length: c.totalModules }, (_, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-center ${
                    i < c.completedModules
                      ? 'bg-orange-500/10 border-orange-500/20'
                      : 'bg-white/[0.02] border-white/[0.04]'
                  }`}
                >
                  <p className={`text-[10px] uppercase font-bold tracking-[0.1em] mb-1 ${
                    i < c.completedModules ? 'text-orange-400' : 'text-zinc-600'
                  }`}>
                    Module {i + 1}
                  </p>
                  <p className={`text-[10px] ${
                    i < c.completedModules ? 'text-zinc-300' : 'text-zinc-600'
                  }`}>
                    {i < c.completedModules ? 'Completed' : 'Pending'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </BorderGlow>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">My Courses</h1>
        <p className="text-sm text-zinc-500 mt-1">{courses.length} courses enrolled</p>
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
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} onSelect={setSelectedCourse} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
