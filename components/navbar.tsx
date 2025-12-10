"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLogout } from "@/app/(auth)/register/hooks/useRegister";

const Navbar = () => {
  const router = useRouter();
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully");
        router.replace("/login");
      },
      onError: () => {
        toast.error("Failed to logout");
      },
    });
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h1 className="font-medium">Navbar</h1>

      <Button variant="outline" onClick={handleLogout} disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" />
            Logging out…
          </>
        ) : (
          "Logout"
        )}
      </Button>
    </div>
  );
};

export default Navbar;
