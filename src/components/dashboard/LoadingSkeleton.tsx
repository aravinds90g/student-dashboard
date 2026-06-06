export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-5/6 animate-pulse">
      {/* Hero skeleton */}
      <div className="h-80 rounded-2xl bg-white/[0.03] md:col-span-2" />

      {/* Streak skeleton */}
      <div className="h-80 rounded-2xl bg-white/[0.03]" />

      {/* Course tiles skeleton */}
      <div className="md:col-span-1 flex flex-col gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 rounded-2xl bg-white/[0.03]" />
        ))}
        <div className="flex-1 rounded-2xl bg-white/[0.03]" />
      </div>

      {/* Activity skeleton */}
      <div className="h-64 rounded-2xl bg-white/[0.03] md:col-span-2" />

      {/* Upcoming classes skeleton */}
      <div className="h-40 rounded-2xl bg-white/[0.03] md:col-span-3" />
    </div>
  );
}
