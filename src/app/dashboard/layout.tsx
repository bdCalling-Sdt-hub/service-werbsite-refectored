import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ResponsiveSidebar from "@/components/ResponsiveSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BASP",
  description: "Best Affordable services Provider",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Nav />
      <div className="h-20"></div>
      <div className="flex relative">
        <div className="">
          <ResponsiveSidebar />
        </div>
        <div className="flex-1 pl-[60px] lg:pl-[326px]">
          <div >{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
