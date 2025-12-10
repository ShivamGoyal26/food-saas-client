"use client";

import { Loader2 } from "lucide-react";
import { useGetCurrentUser } from "./hooks";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data, isLoading, isError, error } = useGetCurrentUser();

  console.log("Current User Data:", data);
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

          <div>Address</div>
          {data?.address ? (
            <p>{data?.address}</p>
          ) : (
            <div className="flex flex-col gap-4">
              <h1 className="text-red-400">No Address added</h1>
              <Button>Add Address</Button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
