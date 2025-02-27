"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/navbar/navbar";
import MinareNavbar from "@/components/layout/minareMarginals/MinareHeader";

export default function NavbarSwitcher() {
  const pathname = usePathname();
  const isMinarePath = pathname.startsWith("/minare");

  return isMinarePath ? <MinareNavbar /> : <Navbar />;
}
