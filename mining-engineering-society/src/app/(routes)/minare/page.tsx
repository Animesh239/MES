import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MinarePage() {
  return (
    <main className="min-h-screen bg-black mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-8">
            Welcome to MINARE
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Mining Industry Network for Advanced Research and Education
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/minare/sponsors">
              <Button className="w-full h-32 text-xl">MINARE spons</Button>
            </Link>

            <Link href="/minare/team">
              <Button className="w-full h-32 text-xl">Our team</Button>
            </Link>

            <Link href="/minare/gallery">
              <Button className="w-full h-32 text-xl">MINARE gallery</Button>
            </Link>
          </div>

          <Link href="/" className="block mt-12">
            <Button variant="outline" className="text-white">
              Back to Mining Engineering Society
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
