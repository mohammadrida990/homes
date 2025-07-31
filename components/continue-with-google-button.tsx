"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth";

export default function ContinueWithGoogleButton() {
  const auth = useAuth();
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={async () => {
        try {
          await auth?.loginWithGoogle();
          router.refresh();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {}
      }}
      className="w-full"
    >
      Continue with Google
    </Button>
  );
}
