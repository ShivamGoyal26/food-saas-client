"use client";

import { Loader2 } from "lucide-react";
import { useGetCurrentUser } from "./hooks";
import LoadAddress from "./components/address/components/load-address";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const { data, isLoading, isError, error } = useGetCurrentUser();

  return (
    <div>
      <p className="mb-10">Profile Section</p>

      {isLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : isError ? (
        <div>Error loading profile: {(error as Error).message}</div>
      ) : (
        <section className="flex flex-col gap-4">
          <div>PROFILE INFORMATION</div>

          <div>
            <label className="font-medium text-xl ">Name</label>
            <p>{data?.name}</p>
          </div>

          {data?.email ? (
            <div>
              <label className="font-medium">Email</label>
              <p>{data?.email}</p>
            </div>
          ) : null}

          {data?.phone ? (
            <div>
              <label className="font-medium">Phone</label>
              <p>{data?.phone}</p>
            </div>
          ) : null}

          <LoadAddress addresses={data?.addresses || []} />

          <Link href="/profile/update">
            <Button>Update Profile</Button>
          </Link>
        </section>
      )}
    </div>
  );
}
