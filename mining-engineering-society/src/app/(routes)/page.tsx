import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" bg-[#000022] w-screen h-screen flex justify-center items-center">
        <Link href="/homepage">
          <Button variant="destructive" size="default">
            HomePage
          </Button>
        </Link>
      </div>
    </>
  );
}
