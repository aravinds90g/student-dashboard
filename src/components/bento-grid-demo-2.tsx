'use client';

import { motion } from 'framer-motion';
import ActivityTile from './ActivityTile';
import BorderGlow from './BorderGlow';
import CourseTile from './dashboard/CourseTile';
import type { DashboardData } from '@/types';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 25 },
  },
};

interface Props {
  dashboardData: DashboardData;
}

export default function BentoGridSecondDemo({ dashboardData }: Props) {
  const { courses, userStats, activities, achievements, upcomingClasses } = dashboardData;

  return (
    <div className="flex flex-col justify-center items-center font-sans">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-5/6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero */}
        <motion.section
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="relative group overflow-hidden rounded-2xl border h-80 md:col-span-2 lg:col-span-2"
        >
          <img src="/image-2.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="relative z-10 p-6 h-full flex flex-col">
            <div>
              <div className="flex items-baseline gap-2 flex-wrap mb-2">
                <h1 className="text-4xl font-light tracking-tight text-white">
                  Welcome back,<span className=" font-bold  bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent"> {userStats?.name ?? 'Aravind'}</span>
                </h1>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="text-xl"
                >
                  👋
                </motion.span>
              </div>

              <div className="text-gray-300 text-sm leading-relaxed">
                You're ahead of{' '}
                <span className="relative inline-block group/percent">
                  <span className="text-[#FF6A00] font-bold text-base relative z-10">
                    {userStats?.ahead_percent ?? 82}%
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="absolute -inset-1 bg-orange-500/20 blur-sm rounded-full scale-0 group-hover/percent:scale-100 transition-transform"
                  />
                </span>{' '}
                of learners this week
              </div>
              <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-emerald-500" />
                Keep up the momentum! 🔥
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { value: userStats?.learning_hours ?? 386, suffix: 'hrs', label: 'Learning Hours' },
                { value: userStats?.completed_courses ?? 14, suffix: '', label: 'Completed' },
                { value: userStats?.certificates ?? 8, suffix: '', label: 'Certificates' },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="group/stat"
                >
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white group-hover/stat:text-transparent group-hover/stat:bg-gradient-to-r group-hover/stat:from-white group-hover/stat:to-orange-500 group-hover/stat:bg-clip-text transition-all duration-300">
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className="text-[10px] text-zinc-500">{stat.suffix}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <p className="text-[9px] uppercase font-bold tracking-[0.1em] text-zinc-500 group-hover/stat:text-zinc-400 transition-colors">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-4/5 h-32 bg-orange-600/20 rounded-full blur-[60px] pointer-events-none transition-all duration-500" />
        </motion.section>

        {/* Streak */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }}>
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
            className="h-80"
          >
            <img src="/image-1.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/25" />
            <span className="absolute top-4 right-4 text-5xl font-semibold bg-gradient-to-r from-white to-orange-600 bg-clip-text text-transparent z-10">Streak</span>
            <span className="absolute bottom-4 left-4 text-9xl font-bold bg-gradient-to-l from-white to-orange-600 bg-clip-text text-transparent z-10">{userStats?.streak_days ?? 17}</span>
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1">
              {weekDays.map((d, i) => (
                <span
                  key={i}
                  className={`w-6 h-6 flex items-center justify-center text-[10px] font-bold rounded-full ${i <= (userStats?.streak_active_until ?? 4) ? 'bg-orange-500/20 text-white' : 'text-zinc-500'
                    }`}
                >
                  {d}
                </span>
              ))}
            </div>
          </BorderGlow>
        </motion.div>

        {/* Left column: mini course cards + achievements */}
        <motion.section variants={itemVariants} className="md:col-span-1 flex flex-col gap-3">
          {courses.map((course, idx) => (
            <CourseTile
              key={course.id}
              title={course.title}
              progress={course.progress}
              iconName={course.icon_name}
              index={idx}
            />
          ))}

          {/* Achievements */}
          <article className="relative overflow-hidden rounded-2xl border flex-1">
            <div className="relative z-10 h-full p-5 flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-zinc-500 mb-4">Achievements</span>
              <div className="flex flex-col gap-3 flex-1 justify-center">
                {achievements.map((achievement, i) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.12 }}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="text-base">{achievement.icon}</span>
                    <span className="text-xs font-medium text-zinc-300">{achievement.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-4/5 h-32 bg-orange-600/30 rounded-full blur-[60px] pointer-events-none transition-all duration-500"></div>
          </article>
        </motion.section>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} className="md:col-span-2 lg:col-span-2">
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
            className="p-8"
          >
            <ActivityTile activities={activities} totalComputeHours={userStats?.total_compute_hours ?? 142.8} efficiencyRate={userStats?.efficiency_rate ?? 12.4} activeModules={userStats?.active_modules ?? 8} avgSessionHours={userStats?.avg_session_hours ?? 2.4} />
          </BorderGlow>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} className="md:col-span-2 lg:col-span-3">
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
            className="p-8"
          >
            <section className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-zinc-500">Upcoming Classes</span>
                <span className="text-[10px] text-orange-500 font-medium">{upcomingClasses.length} today</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {upcomingClasses.map((cls, i) => (
                  <motion.div
                    key={cls.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.12 }}
                    className="rounded-xl bg-white/[0.03] p-4 border border-white/[0.04] hover:border-white/[0.08] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-16 h-1.5 rounded-sm bg-gradient-to-r ${cls.color}`} />
                      <span className="text-xs font-medium text-white truncate">{cls.title}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[11px] text-zinc-400">{cls.time}</span>
                      <span className="text-[10px] text-zinc-600">{cls.duration}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </BorderGlow>
        </motion.div>
      </motion.div>
    </div>
  );
}
