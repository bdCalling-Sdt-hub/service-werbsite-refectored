"use client";
import Modal from "@/components/Reusable/Modal";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import React, { useState } from "react";
import businessImg from "@/assets/images/business-image.png";
import RattingStar from "@/components/RattingStar";
import { CustomSpinner } from "@/components/CustomSpinner";
import { LuSendHorizonal } from "react-icons/lu";

const Review = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  // const [addMessage, { isLoading }] = useAddMessageMutation();
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [modal, setModal] = useState(false);
  const [rating, setRating] = useState(0);
  const handleModalClose = () => {
    setModal((prev) => !prev);
  };
  const { user } = useAppSelector((state) => state.auth);
  async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // try {
    //   const formData = new FormData(e.target as HTMLFormElement);
    //   const res = await addMessage({ businessId, ...formData });
    //   if (res?.data?.ok) {
    //     Swal.fire({
    //       icon: "success",
    //       text: res.data.message,
    //     });
    //     handleModalClose();
    //     setFormData({});
    //   } else {
    //     handleModalClose();
    //     Swal.fire({
    //       icon: "error",
    //       text: "Internal Server Error!!",
    //       // text: res.error?.data.message ,
    //     });
    //   }
    // } catch (error) {
    //   handleModalClose();
    //   Swal.fire({
    //     icon: "error",
    //     text: "Something went wrong. Please try again later.",
    //   });
    // }
  }
  console.log(searchParams);
  return (
    <div className="min-h-screen">
      <button
        onClick={handleModalClose}
        className="bg-green-500 active:bg-green-600 disabled:cursor-not-allowed py-3 px-10 text-white rounded-md col-span-2 font-light outline-non disabled:bg-green-500 flex justify-center items-center gap-2"
      >
        add Review
      </button>
      {user?.id && (
        <Modal
          isOpen={modal}
          onClose={handleModalClose}
          className="w-full max-w-[600px] p-8 bg-white rounded-lg space-y-3"
        >
          <div className="flex justify-start items-center gap-3">
            <Image
              src={businessImg}
              alt={"business"}
              width={500}
              height={400}
              className="h-20 w-20 rounded-full"
            />
            <div className="">
              <Modal.Header>
                <h2 className="text-xl font-medium">{"New business"}</h2>
              </Modal.Header>
              <p>Main Service name</p>
            </div>
          </div>
          <form onSubmit={handelSubmit} className="w-full space-y-3">
            <div className="flex justify-start items-center gap-3">
              <p>Take Rating & Review :</p>{" "}
              <RattingStar rating={rating} setRating={setRating} />
            </div>
            <textarea
              name="message"
              placeholder="Text.."
              value={formData?.message}
              onChange={(e) =>
                setFormData((c) => ({ ...c, [e.target.name]: e.target.value }))
              }
              required
              rows={5}
              className="p-3 w-full border border-black-500 rounded-md focus:outline-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                // disabled={isLoading}
                className="bg-green-500 active:bg-green-600 disabled:cursor-not-allowed py-3 px-10 text-white rounded-md col-span-2 font-light outline-non disabled:bg-green-500 flex justify-center items-center gap-3"
              >
                Submit
                {!"isLoading" ? <CustomSpinner /> : <LuSendHorizonal />}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Review;
