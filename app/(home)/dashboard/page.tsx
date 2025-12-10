"use client";

import { useGetCurrentUser } from "../profile/hooks";
import Link from "next/link";

export default function DashboardPage() {
  const { data } = useGetCurrentUser();

  return (
    <section>
      <div className="text-2xl">Dashboard</div>

      <div className="text-xl">Welcome, {data?.name}</div>

      <Link href="/profile">Go to profile</Link>
    </section>
  );
}
