"use client";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import RattingStar from "@/components/RattingStar";
import { CustomSpinner } from "@/components/CustomSpinner";
import { LuSendHorizonal } from "react-icons/lu";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import {
  useCreateReviewMutation,
  useGetSingleCommunicationQuery,
} from "@/redux/features/review/reviewApi";
import { redirect, usePathname, useRouter } from "next/navigation";
import profileLogo from "@/assets/images/profile-demo.jpg";
import Swal from "sweetalert2";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

const Review = ({ params }: { params: { [key: string]: string } }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [rating, setRating] = useState(0);
  const { data, isLoading, isError } = useGetSingleCommunicationQuery(
    params.commuId,
    { skip: !params.commuId }
  );

  const { user, isLoading: userLoading } = useAppSelector(
    (state) => state.auth
  );

  const [mutation, { isLoading: muLoding }] = useCreateReviewMutation();

  async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (!rating) {
        return Swal.fire({
          icon: "error",
          text: "Please select a rate from rating star!",
        });
      }

      if (!formData.discount && formData.discount !== 0) {
        return Swal.fire({
          icon: "error",
          text: "Please select a discount!",
        });
      }

      if (!formData.message) {
        return Swal.fire({
          icon: "error",
          text: "Please write a review!",
        });
      }

      const res = await mutation({
        communicationId: params.commuId,
        rating: rating,
        ...formData,
      });
      // console.log(res);
      if (res?.data?.ok) {
        Swal.fire({
          icon: "success",
          text: res.data.message,
          timer: 1000,
        });
        router.push("/");
      } else {
        Swal.fire({
          icon: "error",
          text: (res?.error as any).data?.message || "Internal Server Error!!",
          // text: res.error?.data.message ,
        });
      }
    } catch (error) {
      // console.log(error)
      Swal.fire({
        icon: "error",
        text: "Something went wrong. Please try again later.",
      });
    }
  }

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <LoaderWraperComp isLoading={isLoading || userLoading} isError={isError}>
        <form
          onSubmit={handelSubmit}
          className="w-full space-y-4 max-w-xl border rounded-2xl p-5 lg:p-10 m-5 lg:m-10 shadow-lg"
        >
          <div className="flex justify-start items-center gap-3 mb-10">
            <div>
              <Image
                src={
                  data?.data?.business?.user?.image
                    ? apiUrl + data?.data?.business?.user?.image
                    : profileLogo
                }
                alt="logo"
                className="w-20 border rounded-full"
                width={1000}
                height={1000}
                priority
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-lg lg:text-xl font-semibold">
                {data?.data?.business?.name}
              </h1>
              <p className="text-gray-500">{data?.data?.business?.address}</p>
            </div>
          </div>

          <h1 className="text-lg font-medium">Place Rating & Review:</h1>
          <div className="flex justify-start items-center gap-3">
            <p>Take Rating :</p>{" "}
            <RattingStar rating={rating} setRating={setRating} />
          </div>
          <div className="flex justify-start items-center gap-3">
            <p>Discount :</p>{" "}
            <div className="flex items-center gap-2 font-semibold">
              <div>
                <input
                  type="radio"
                  name="discount"
                  className="mr-1"
                  required
                  onChange={(e) => setFormData((c) => ({ ...c, discount: 0 }))}
                />
                <label>None</label>
              </div>
              {[5, 10, 15].map((d, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    name="discount"
                    className="mr-1"
                    required
                    onChange={(e) =>
                      setFormData((c) => ({ ...c, discount: d }))
                    }
                  />
                  <label>{d}%</label>
                </div>
              ))}
            </div>
          </div>
          <textarea
            name="message"
            placeholder="Review text.."
            value={formData?.message}
            onChange={(e) =>
              setFormData((c) => ({ ...c, [e.target.name]: e.target.value }))
            }
            required
            rows={5}
            className="p-3 w-full border border-black-500 rounded-md focus:outline-none"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={muLoding}
              className="bg-mastard-500 active:bg-mastard-600 disabled:cursor-not-allowed py-3 px-10 text-green-500 rounded-md col-span-2 font-light outline-non disabled:bg-green-500 disabled:text-white flex justify-center items-center gap-3"
            >
              Submit
              {muLoding ? <CustomSpinner /> : <LuSendHorizonal />}
            </button>
          </div>
        </form>
      </LoaderWraperComp>
    </div>
  );
};

export default Review;
