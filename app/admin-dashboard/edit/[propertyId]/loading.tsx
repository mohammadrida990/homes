import { Skeleton } from "@/components/ui/skeleton";
import { HomeIcon } from "lucide-react";

export default function Loading() {
  return (
    <>
      <div className="mx-auto max-w-screen-lg">
        <h1 className="p-5 font-bold text-4xl">Property Search</h1>
      </div>

      <Skeleton className="top-1/2 left-1/2 fixed flex justify-center items-center bg-sky-950 rounded-full size-20 text-white -translate-x-1/2 -translate-y-1/2">
        <HomeIcon />
      </Skeleton>
    </>
  );
}
