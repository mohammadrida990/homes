"use client";

import { HeartIcon } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addFavorite, removeFavorite } from "./actions";

export default function ToggleFavoriteButton({
  propertyId,
  isFavorite,
}: {
  propertyId: string;
  isFavorite: boolean;
}) {
  const auth = useAuth();
  const router = useRouter();

  return (
    <button
      className="top-0 right-0 z-10 absolute bg-white p-2 rounded-bl-lg"
      onClick={async () => {
        const tokenResult = await auth?.currentUser?.getIdTokenResult();

        if (!tokenResult) {
          router.push("/login");
          return;
        }

        if (isFavorite) {
          await removeFavorite(propertyId, tokenResult.token);
        } else {
          await addFavorite(propertyId, tokenResult.token);
        }

        toast.success(
          `Property ${isFavorite ? "removed from" : "added to"} favorites`
        );

        router.refresh();
      }}
    >
      <HeartIcon
        className="text-black"
        fill={isFavorite ? "#db2777" : "white"}
      />
    </button>
  );
}
