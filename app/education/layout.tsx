"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { UserProgress } from "@/components/education/user-progress";
import { Separator } from "@/components/ui/separator";

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/education");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-muted/40">
          <ScrollArea className="flex-1 p-4">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-4 w-48 mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </ScrollArea>
        </aside>
        <main className="flex-1 lg:pl-72">
          <div className="px-4 py-6 lg:px-8">
            <Skeleton className="h-96 w-full" />
          </div>
        </main>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-muted/40">
        <ScrollArea className="flex-1 p-4">
          <UserProgress />
          <Separator className="my-4" />
          {/* Add course navigation here if needed */}
        </ScrollArea>
      </aside>
      <main className="flex-1 lg:pl-72">
        <div className="px-4 py-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
