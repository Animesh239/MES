"use client";

import { useAuthStore } from "@/lib/firebase/authListener";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function MinareLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      useAuthStore.setState({ isLoading: false, isInitialized: true });
    } else {
      import("@/lib/firebase/authListener").then(
        ({ initializeAuthListener }) => {
          initializeAuthListener();
        }
      );
    }
  }, [pathname]);

  return (
    <div>
      {/* <MinareNavbar /> */}
      <main>{children}</main>
    </div>
  );
}
