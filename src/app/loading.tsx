import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-32 sm:px-6 lg:px-8">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-12 w-full max-w-2xl" />
      <Skeleton className="h-4 w-full max-w-xl" />
      <Skeleton className="h-4 w-2/3 max-w-lg" />
      <div className="mt-4 flex gap-4">
        <Skeleton className="h-12 w-40" />
        <Skeleton className="h-12 w-40" />
      </div>
    </div>
  );
}
