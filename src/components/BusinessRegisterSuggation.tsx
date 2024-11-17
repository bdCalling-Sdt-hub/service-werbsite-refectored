"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function BusinessRegisterSuggation() {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();
  if (showModal) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#272727ce] fixed top-0 left-0 z-10">
        <div className="bg-[#F6ECE9] p-6 rounded-3xl">
          <p className="mt-4 mb-16">
            Register your business to appear in search results
          </p>
          <div className="flex  gap-2 justify-end">
            <button
              className="px-6 py-2 border border-red-500 rounded-full text-red-500"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="px-6 py-2 bg-mastard-500 rounded-full text-green-500"
              onClick={() => router.push("/register-business")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default BusinessRegisterSuggation;
