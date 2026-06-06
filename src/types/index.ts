export type SidebarTab = 'dashboard' | 'courses' | 'assignments' | 'certificates' | 'community' | 'settings';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  thumbnail: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  nextDeadline?: string;
  hoursSpent: number;
  status: 'in-progress' | 'completed' | 'not-started';
  color: string;
}

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  description: string;
  dueDate: string;
  maxPoints: number;
  scoredPoints?: number;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedHours: number;
}

export interface Certificate {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  issuedDate: string;
  credentialId: string;
  instructor: string;
  thumbnail: string;
  grade: string;
  hoursSpent: number;
}

export interface SupabaseCourse {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface UserStats {
  name: string;
  ahead_percent: number;
  learning_hours: number;
  completed_courses: number;
  certificates: number;
  streak_days: number;
  streak_active_until: number;
  total_compute_hours: number;
  efficiency_rate: number;
  active_modules: number;
  avg_session_hours: number;
}

export interface ActivityData {
  day: string;
  hours: number;
}

export interface AchievementData {
  title: string;
  icon: string;
}

export interface UpcomingClassData {
  title: string;
  time: string;
  duration: string;
  color: string;
}

export interface DashboardData {
  courses: SupabaseCourse[];
  userStats: UserStats | null;
  activities: ActivityData[];
  achievements: AchievementData[];
  upcomingClasses: UpcomingClassData[];
}
