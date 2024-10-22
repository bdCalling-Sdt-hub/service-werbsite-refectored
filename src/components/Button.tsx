"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";
import Swal from "sweetalert2";
import { useAppSelector } from "@/redux/hooks";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Bu({
  id,
  minimumStar,
  starQty,
}: {
  id: string;
  minimumStar: number;
  starQty: number;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const neededStar = minimumStar > starQty;
  const { user } = useAppSelector((state) => state.auth);
  async function handleCheckout() {
    try {
      const currentUrl = window.location.origin;
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
          cancelUrl: currentUrl + "/dashboard/upgrade-plane",
          successUrl: currentUrl + "/dashboard",
        }),
      });
      const result = await res.json();
      if (result.ok) {
        setIsLoading(false);
        window.location = result?.data?.url;
        // window.open(result.data?.url, "noopener,noreferrer");
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

  async function handelUpgrade() {
    try {
      const token = Cookies.get("token");
      setIsLoading(true);
      const res = await fetch(apiUrl + `payments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId: id,
        }),
      });
      const result = await res.json();
      if (result.ok) {
        setIsLoading(false);
        window.location.reload();
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

  const currentSubscriptionId =
    user?.business?.payments && user?.business?.payments[0]
      ? user?.business?.payments[0].subscription.id
      : undefined;

  return (
    <button
      disabled={neededStar || isLoading}
      className={`py-5 w-full bg-green-500 text-white rounded-xl disabled:bg-green-400 ${
        isLoading ? "disabled:cursor-wait" : "disabled:cursor-not-allowed"
      }`}
      onClick={
        currentSubscriptionId
          ? currentSubscriptionId === id
            ? () => {}
            : handelUpgrade
          : handleCheckout
      }
    >
      {currentSubscriptionId
        ? currentSubscriptionId === id
          ? "Active"
          : "Upgrade"
        : neededStar
        ? `Minimum need ${minimumStar} stars`
        : "Get Started"}
    </button>
  );
}
