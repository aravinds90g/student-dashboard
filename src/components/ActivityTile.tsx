'use client';

import { motion } from 'framer-motion';
import type { ActivityData } from '@/types';

interface Props {
  activities: ActivityData[];
  totalComputeHours: number;
  efficiencyRate: number;
  activeModules: number;
  avgSessionHours: number;
}

export default function ActivityTile({ activities, totalComputeHours, efficiencyRate, activeModules, avgSessionHours }: Props) {
  const maxValue = activities.length > 0 ? Math.max(...activities.map(d => d.hours)) : 1;

  return (
    <div className="flex flex-col h-full justify-between min-h-[620px]">
      <div>
        <h3 className="text-base font-semibold text-white tracking-tight">
          System Dynamics
        </h3>
        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
          Telemetry log of weekly compilation & module actions.
        </p>
      </div>

      <div className="flex items-end justify-between h-56 gap-3 mt-6 px-1">
        {activities.map((item, idx) => {
          const heightPercent = (item.hours / maxValue) * 100;
          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mb-1">
                <span className="text-[10px] text-zinc-300 font-tabular font-semibold bg-zinc-800 px-1.5 py-0.5 rounded">
                  {item.hours}h
                </span>
              </div>

              <div className="w-full max-w-[45px] mx-auto bg-zinc-900/80 rounded-full relative h-56 flex items-end overflow-hidden border border-white/[0.02]">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{
                    duration: 1,
                    ease: [0.25, 1, 0.5, 1],
                    delay: idx * 0.04,
                  }}
                  className="w-full bg-gradient-to-t from-[#FF4400]/80 to-[#FF5A26] rounded-full relative"
                  style={{ minHeight: '8px' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/30" />
                </motion.div>
              </div>

              <span className="text-[10px] text-zinc-600 font-medium font-tabular group-hover:text-zinc-300 transition-colors duration-200">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-white/[0.04] pt-5 mt-6 flex justify-between">
        <div>
          <span className="block text-[10px] uppercase font-bold tracking-[0.15em] text-zinc-600 mb-1">
            Total Compute
          </span>
          <span className="text-lg font-bold text-white font-tabular tracking-tight">
            {totalComputeHours} <span className="text-xs text-zinc-400 font-medium">hrs</span>
          </span>
        </div>
        <div className="text-right">
          <span className="block text-[10px] uppercase font-bold tracking-[0.15em] text-zinc-600 mb-1">
            Efficiency Rate
          </span>
          <span className="text-lg font-bold text-[#FF5A26] font-tabular tracking-tight">
            +{efficiencyRate}<span className="text-xs text-zinc-400 font-medium">%</span>
          </span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-bold tracking-[0.15em] text-zinc-600 mb-1">
            Active Modules
          </span>
          <span className="text-lg font-bold text-white font-tabular tracking-tight">
            {activeModules} <span className="text-xs text-zinc-400 font-medium">courses</span>
          </span>
        </div>
        <div className="text-right">
          <span className="block text-[10px] uppercase font-bold tracking-[0.15em] text-zinc-600 mb-1">
            Avg. Session
          </span>
          <span className="text-lg font-bold text-white font-tabular tracking-tight">
            {avgSessionHours} <span className="text-xs text-zinc-400 font-medium">hrs</span>
          </span>
        </div>
      </div>
    </div>
  );
}
