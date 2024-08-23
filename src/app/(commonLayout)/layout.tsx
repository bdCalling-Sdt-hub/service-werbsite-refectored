import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
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
      {children}
      <Footer />
    </div>
  );
}
