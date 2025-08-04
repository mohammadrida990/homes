import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center -mt-24 p-24 min-h-screen">
      <Image fill className="object-cover" src="/hero.jpg" alt="" />

      <div className="top-0 left-0 absolute bg-black/50 backdrop-blur-sm size-full" />

      <div className="z-10 relative flex flex-col gap-10 text-white">
        <h1 className="max-w-screen-md font-semibold text-5xl text-center uppercase tracking-widest">
          Discover exceptional properties tailored to your lifestyle with Homes
          App.
        </h1>

        <Button asChild className="gap-5 mx-auto p-8 text-lg">
          <Link href="/property-search">
            <SearchIcon /> Search Properties
          </Link>
        </Button>
      </div>
    </main>
  );
}
