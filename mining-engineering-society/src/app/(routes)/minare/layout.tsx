
"use client";
// import MinareNavbar from "@/components/layout/minareMarginals/MinareHeader";
import { initializeAuthListener } from "@/lib/firebase/authListener";
import { useEffect } from "react";

export default function MinareLayout({
  children
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initializeAuthListener();
  }, []);
  return (
    <div>
      {/* <MinareNavbar /> */}
      <main>{children}</main>
    </div>
  );
}
