import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-28 bg-green-900 py-[76px] lg:px-36 px-8 grid lg:grid-cols-4 lg:gap-36 gap-8 text-white">
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
        <h4 className="text-2xl font-bold">Company</h4>
        <ul className="text-lg mt-6 flex flex-col gap-1 font-thin">
          <Link href="/terms">Terms of services</Link>
          <Link href="/policy">Privacy policy</Link>
        </ul>
      </div>
      <div>
        <h4 className="text-2xl font-bold">Links</h4>
        <ul className="text-lg mt-6 flex flex-col gap-1 font-thin">
          <Link href="/about">About us</Link>
          <Link href="/services">Services</Link>
        </ul>
      </div>
      <div>
        <h4 className="text-2xl font-bold">Contact</h4>
        <ul className="text-lg mt-6 flex flex-col gap-1 font-thin">
          <li>4967 Sardis Sta,
          Victoria 8007, Montreal.</li>
          <li>+1 246-345-0695</li>
          <li>support@abcx.com</li>
        </ul>
      </div>
    </footer>
  );
}
