import Image from "next/image";
import React, { useState } from "react";
import businessLogo from "@/assets/images/profile-demo.jpg";
import { IoIosNotificationsOutline } from "react-icons/io";
import Modal from "./Reusable/Modal";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

const NotificationCart = ({
  data,
  index,
}: {
  data: { [key: string]: any };
  index: number;
}) => {
  const [modal, setModal] = useState(false);
  const handleModalClose = () => {
    setModal((prev) => !prev);
  };
  return (
    <>
      <div
        onClick={() => setModal(true)}
        className={`flex items-center justify-start gap-4 px-[24px] py-[8px] cursor-pointer hover:shadow-md ${
          index !== 0 && "hover:border-t border-gray-50"
        } duration-300`}
      >
        <div className="w-[70px] h-[70px] relative">
          <Image
            src={data.user?.image ? apiUrl + data?.user?.image : businessLogo}
            alt={data.name}
            className="rounded-full w-full h-full border p-0.5 content-evenly "
            width={150}
            height={150}
            priority
          />
        </div>
        <div className="space-y-2">
          <h6 className="text-[#181414] ">
            You have received{" "}
            <span className="font-medium  capitalize">
              {data.type.toLowerCase()}
            </span>{" "}
            from{" "}
            <span className="font-medium">
              {data?.user?.firstName} {data?.user?.lastName}
            </span>
            .
          </h6>
          <div className="flex items-center gap-0.5">
            <small className="text-[12px] text-lightgreen">
              {new Date(data?.createdAt).toLocaleString()}
            </small>
            <IoIosNotificationsOutline className={`text-green-300`} size={13} />
          </div>
        </div>
      </div>
      <Modal
        isOpen={modal}
        onClose={handleModalClose}
        className="w-full max-w-[600px] p-8 bg-white rounded-lg"
      >
        <Modal.Header>Write your message :</Modal.Header>
        
        {/* <form onSubmit={handelSubmit} className="w-full space-y-3">
      <textarea
        name="message"
        placeholder="Text.."
        value={formData?.message}
        onChange={(e) =>
          setFormData((c) => ({ ...c, [e.target.name]: e.target.value }))
        }
        required
        rows={6}
        className="p-3 w-full border border-black-500 rounded-md focus:outline-none"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-green-500 active:bg-green-600 disabled:cursor-not-allowed py-3 px-10 text-white rounded-md col-span-2 font-light outline-non disabled:bg-green-500 flex justify-center items-center gap-2"
      >
        Send
        {isLoading ? <CustomSpinner /> : <LuSendHorizonal />}
      </button>
    </form> */}
      </Modal>
    </>
  );
};

export default NotificationCart;
