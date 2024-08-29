import React from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default async function Page() {
  const res = await fetch(`${apiUrl}app-data`, {
    cache: "no-store",
  });
  const { data: settings } = await res.json();
  
  return (
    <section className="lg:px-36 lg:py-16 px-2 py-4 min-h-screen">
      <h2 className="text-3xl font-medium text-center">Terms and Conditions</h2>
      <div
        className="my-4"
        dangerouslySetInnerHTML={{ __html: settings?.terms ?? "" }}
      />
    </section>
  );
}
