import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-28 bg-slate-100 py-[76px] lg:px-36 px-8 grid lg:grid-cols-5 lg:gap-36 gap-8 text-black">
      <div>
        <Image
          src="/LOGO.png"
          className="mb-4"
          alt="logo"
          width={227}
          height={60}
        />
        <span className="font-medium mb-2">BASP</span>
        <p>Choose Your Best & Affordable ServiceProvider Your Way</p>
      </div>
      <div>
        <h4 className="text-xl font-bold">Company</h4>
        <ul className="mt-6 flex flex-col gap-1">
          <Link href="/terms">Terms of services</Link>
          <Link href="/policy">Privacy policy</Link>
          <Link href="/about">About us</Link>
        </ul>
      </div>
      <div>
        <h4 className="text-xl font-bold">For Customer</h4>
        <ul className="mt-6 flex flex-col gap-1">
          <Link href="/add-bit-wallet">Bid</Link>
          <Link href="/jobs">Jobs</Link>
        </ul>
      </div>
      <div>
        <h4 className="text-xl font-bold">For Service Provider</h4>
        <ul className="mt-6 flex flex-col gap-1">
          <Link href="/dashboard">Dashboard</Link>
          {/* <Link href="/jobs">Jobs</Link       > */}
        </ul>
      </div>
      <div>
        <h4 className="text-xl font-bold">Contact</h4>
        <ul className="mt-6 flex flex-col gap-1">
          <li>4967 Sardis Sta, Victoria 8007, Montreal.</li>
          <li>+1 246-345-0695</li>
          <li>support@abcx.com</li>
        </ul>
      </div>
    </footer>
  );
}
