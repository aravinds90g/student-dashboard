import { Suspense } from 'react';
import { createServerClient } from '@/lib/supabase';
import HomeClient from '@/components/HomeClient';
import LoadingSkeleton from '@/components/dashboard/LoadingSkeleton';
import ErrorFallback from '@/components/dashboard/ErrorFallback';
import type { DashboardData, SupabaseCourse, UserStats, ActivityData, AchievementData, UpcomingClassData } from '@/types';

export const dynamic = 'force-dynamic';

async function DashboardContent() {
  const supabase = createServerClient();

  const results = await Promise.all([
    supabase.from('courses').select('*').order('created_at', { ascending: true }),
    supabase.from('user_stats').select('*').limit(1).single(),
    supabase.from('activities').select('*').order('created_at', { ascending: true }),
    supabase.from('achievements').select('*').order('created_at', { ascending: true }),
    supabase.from('upcoming_classes').select('*').order('created_at', { ascending: true }),
  ]);

  const [coursesRes, statsRes, activitiesRes, achievementsRes, upcomingRes] = results;

  if (coursesRes.error) throw coursesRes.error;
  if (statsRes.error) throw statsRes.error;
  if (activitiesRes.error) throw activitiesRes.error;
  if (achievementsRes.error) throw achievementsRes.error;
  if (upcomingRes.error) throw upcomingRes.error;

  const dashboardData: DashboardData = {
    courses: (coursesRes.data ?? []) as SupabaseCourse[],
    userStats: statsRes.data as UserStats | null,
    activities: (activitiesRes.data ?? []) as ActivityData[],
    achievements: (achievementsRes.data ?? []) as AchievementData[],
    upcomingClasses: (upcomingRes.data ?? []) as UpcomingClassData[],
  };

  return <HomeClient dashboardData={dashboardData} />;
}

export default async function Home() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
