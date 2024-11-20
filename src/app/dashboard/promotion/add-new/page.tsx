"use client";

import React from "react";
import { CustomSpinner } from "@/components/CustomSpinner";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { usePostPromotionMutation } from "@/redux/features/promotion/promotionApi";

const NewPromotion = () => {
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
  return (
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
          <label className="col-span-2">Start Date </label>
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
              required
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
          <label className="col-span-2">Discount </label>
          <div className="relative col-span-8">
            <input
              type="text"
              name="discount"
              placeholder="12.22"
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
  );
};

export default NewPromotion;
