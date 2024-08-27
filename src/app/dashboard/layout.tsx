"use client";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ResponsiveSidebar from "@/components/ResponsiveSidebar";
import { useAppSelector } from "@/redux/hooks";
import type { Metadata } from "next";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

// export const metadata: Metadata = {
//   title: "BASP",
//   description: "Best Affordable services Provider",
// };

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentPath = usePathname();
  const { user, isLoading } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!isLoading && !user?.id) {
     return redirect(
        "/login?redirect_path=" + currentPath.slice(1).split("/").join("-")
      );
    }
  }, [user]);
  // if (isLoading) {
  //   return <p>Loading....</p>
  // }
  return (
    <div>
      <Nav />
      <div className="h-20"></div>
      <div className="flex relative">
        <div className="">
          <ResponsiveSidebar />
        </div>
        <div className="flex-1 pl-[60px] lg:pl-[326px]">
          <div>{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
