import { AlertCircle } from 'lucide-react';

export default function ErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center w-5/6 h-96 rounded-2xl border border-red-500/20 bg-red-500/5 gap-4">
      <AlertCircle size={32} className="text-red-400" />
      <p className="text-sm text-zinc-400">Failed to load dashboard data</p>
      <p className="text-xs text-zinc-600">Please ensure the courses table exists in Supabase</p>
    </div>
  );
}
