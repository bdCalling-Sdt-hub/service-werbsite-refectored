"use client";
import { CustomSpinner } from "@/components/CustomSpinner";
import PageHeading from "@/components/PageHeading";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import Swal from "sweetalert2";
import { redirect, useRouter } from "next/navigation";
import { usePostPromotionMutation } from "@/redux/features/promotion/promotionApi";
import Cookies from "js-cookie";

const apiURL = process.env.NEXT_PUBLIC_API_URL;
if (!apiURL) throw new Error("API URL is not defined in .env file");

const Promotion = () => {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [promotionData, setPromotionData] = React.useState<{
    [key: string]: any;
  }>({});
  const [mutaion, { isLoading: muLoading }] = usePostPromotionMutation();

  async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    var object: { [key: string]: any } = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    try {
      const res = await mutaion({ ...object, ...promotionData }).unwrap();
      router.back();
      Swal.fire({
        icon: "success",
        text: res.message || "Uploading successful!",
        timer: 1000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text:
          (error as any).data.message ||
          "Something went wrong. Please try again later.",
      });
    }
  }

  async function deletePromotion(id: string) {
    try {
      const token = Cookies.get("token");

      if (!token) redirect("/login");

      const res = await fetch(apiURL + "promotions/" + id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          text: "Promotion deleted successfully!",
          timer: 1000,
        });

        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          text: "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text:
          (error as any).data.message ||
          "Something went wrong. Please try again later.",
      });
    }
  }

  return (
    <div className="min-h-[90vh]">
      <div className="px-[32px] py-[32px] border-b border-[#b7b6b6c9] flex justify-between items-center">
        <PageHeading title={"Promotion"} backPath="/dashboard" />
      </div>

      {user?.business?.Promotions && user?.business?.Promotions.length > 0 ? (
        <div className="max-w-sm mx-auto my-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {user.business.Promotions[0].title}
            </h2>
            <p className="text-green-600 text-xl mt-2">
              {user.business.Promotions[0].discount}% OFF
            </p>
            <div className="mt-4">
              <p className="text-gray-500 text-sm">
                <span className="font-semibold text-gray-700">Start Date:</span>{" "}
                {new Date(
                  user.business.Promotions[0].startAt
                ).toLocaleDateString()}
              </p>
              <p className="text-gray-500 text-sm">
                <span className="font-semibold text-gray-700">End Date:</span>{" "}
                {new Date(
                  user.business.Promotions[0].endAt
                ).toLocaleDateString()}
              </p>
            </div>
            {user.business.Promotions[0].isVerified ? (
              <span className="inline-block mt-4 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                Verified
              </span>
            ) : (
              <span className="inline-block mt-4 px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                Not Verified
              </span>
            )}
            <button
              onClick={() =>
                deletePromotion(
                  (user.business as { Promotions: { id: string }[] })
                    .Promotions[0].id
                )
              }
              className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition-all"
            >
              Delete
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded-b-lg text-right">
            <p className="text-xs text-gray-400">
              Created on:{" "}
              {new Date(user.business.Promotions[0].createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ) : (
        <div className=" min-h-[90vh] w-full flex flex-col justify-center items-start  px-3 py-10">
          <form
            className=" rounded-2xl border-green-500 mx-auto border py-16 px-7 lg:px-11 grid grid-cols-1 gap-6 mt-10 "
            onSubmit={handelSubmit}
          >
            <h2 className="text-2xl lg:text-4xl font-medium text-center mb-6">
              Promotion
            </h2>

            <div className="grid grid-cols-10 gap-4 items-center">
              <label className="col-span-2">Title </label>
              <div className="relative col-span-8">
                <input
                  type="text"
                  name="title"
                  placeholder="Promotion Title"
                  autoComplete="off"
                  required
                  className="p-3 w-full border border-black-500 rounded"
                />
              </div>
            </div>
            <div className="grid grid-cols-10 gap-4 items-center">
              <label className="col-span-2">
                Start Date <br />
                (optional){" "}
              </label>
              <div className="relative col-span-8">
                <input
                  type="date"
                  name="startAt"
                  onChange={(e) => {
                    setPromotionData((c) => ({
                      ...promotionData,
                      [e.target.name]: new Date(e.target.value).getTime(),
                    }));
                  }}
                  autoComplete="off"
                  className="p-3 w-full border border-black-500 rounded"
                />
              </div>
            </div>
            <div className="grid grid-cols-10 gap-4 items-center">
              <label className="col-span-2">End Date </label>
              <div className="relative col-span-8">
                <input
                  type="date"
                  name="endAt"
                  onChange={(e) => {
                    setPromotionData((c) => ({
                      ...promotionData,
                      [e.target.name]: new Date(e.target.value).getTime(),
                    }));
                  }}
                  autoComplete="off"
                  required
                  className="p-3 w-full border border-black-500 rounded"
                />
              </div>
            </div>
            <div className="grid grid-cols-10 gap-4 items-center">
              <label className="col-span-2">Discount</label>
              <div className="relative col-span-8">
                <input
                  type="text"
                  name="discount"
                  placeholder="Discount"
                  value={promotionData?.discount || ""}
                  onChange={(e) => {
                    if (
                      !isNaN(Number(e.target.value)) &&
                      Number(e.target.value) < 100
                    ) {
                      setPromotionData((c) => ({
                        ...promotionData,
                        [e.target.name]: Number(e.target.value),
                      }));
                    }
                  }}
                  autoComplete="off"
                  required
                  className="p-3 w-full border border-black-500 rounded"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={muLoading}
              className="ml-auto bg-mastard-500 active:bg-mastard-600 disabled:cursor-not-allowed w-40 px-8 py-3 text-green-500 rounded-md font-light outline-non disabled:bg-green-500 disabled:text-white flex justify-center items-center gap-2"
            >
              Submit
              {muLoading && <CustomSpinner />}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Promotion;
