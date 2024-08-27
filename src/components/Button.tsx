"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";
import Swal from "sweetalert2";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Bu({
  id,
  minimumStar,
}: {
  id: string;
  minimumStar: number;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const neededStar = minimumStar > 40;

  async function handleCheckout() {
    try {
      const curreentUrl = window.location.origin;
      // return console.log(curreentUrl);
      const token = Cookies.get("token");
      setIsLoading(true);
      const res = await fetch(apiUrl + `payments/create-checkout-session`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId: id,
          cancelUrl: curreentUrl + "/dashboard/upgrade-plane",
          successUrl: curreentUrl + "/",
        }),
      });
      const result = await res.json();
      if (result.ok) {
        setIsLoading(false);
        window.open(result.data?.url, "_blank", "noopener,noreferrer");
      } else {
        Swal.fire({
          icon: "error",
          text: "Internal Server Error!!",
          // text: res.error?.data.message ,
        });
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        text: "Something went wrong. Please try again later.",
      });
    }
  }

  return (
    <button
      disabled={neededStar || isLoading}
      className={`py-5 w-full bg-green-500 text-white rounded-xl disabled:bg-green-400 ${
        isLoading ? "disabled:cursor-wait" : "disabled:cursor-not-allowed"
      }`}
      onClick={handleCheckout}
    >
      {neededStar ? `Mimum need ${minimumStar} stars` : "Get Started"}
    </button>
  );
}
