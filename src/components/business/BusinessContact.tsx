"use client";

import { useAppSelector } from "@/redux/hooks";
import Modal from "../Reusable/Modal";
import { CustomSpinner } from "../CustomSpinner";
import { LuSendHorizonal } from "react-icons/lu";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAddMessageMutation } from "@/redux/features/message/messageApi";
import { usePathname, useRouter } from "next/navigation";

export default function BusinessContact({
  number,
  email,
  businessId,
}: {
  number?: string;
  email?: string;
  businessId?: string;
}) {
  const currentPath = usePathname();
  const router = useRouter();
  // const location = window.location;
  const [addMessage, { isLoading }] = useAddMessageMutation();
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [modal, setModal] = useState(false);
  const handleModalClose = () => {
    setModal((prev) => !prev);
    router.push(currentPath)
  };
  const { user } = useAppSelector((state) => state.auth);
  async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await addMessage({
        businessId,
        ...formData,
        type: "MESSAGE",
      });
      if (res?.data?.ok) {
        Swal.fire({
          icon: "success",
          text: res.data.message,
        });
        handleModalClose();
        setFormData({});
      } else {
        handleModalClose();
        Swal.fire({
          icon: "error",
          text: "Internal Server Error!!",
          // text: res.error?.data.message ,
        });
      }
    } catch (error) {
      handleModalClose();
      Swal.fire({
        icon: "error",
        text: "Something went wrong. Please try again later.",
      });
    }
  }
  async function handleCall() {
    addMessage({
      type: "CALL",
      businessId: businessId,
    });
    Swal.fire({
      title: `Do you want to call the <br/> ${number}`,
      showCancelButton: true,
      showDenyButton: false,
      confirmButtonText: "📞 Call",
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(`tel:+880 1837551821`);
      }
    });
  }
  useEffect(()=> {
    if (window.location.hash === "#send-message") {
      setModal(true)
    }
  }, [])
  // console.log(search);
  return (
    <>
      <div className="flex flex-row justify-center lg:justify-start items-center  gap-4 text-white font-light">
        {/* <a href={"tel:" + number} target="_blank" className="line-clamp-1"> */}
        <button
          onClick={handleCall}
          className="flex items-center justify-center gap-2 w-32 h-12 lg:w-52 lg:h-16 bg-green-500 rounded-md"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.3999 3.5999C2.3999 2.93716 2.93716 2.3999 3.5999 2.3999H6.18335C6.76996 2.3999 7.27059 2.824 7.36702 3.40262L8.2542 8.72567C8.3408 9.24531 8.07837 9.76067 7.60718 9.99626L5.74941 10.9251C7.08897 14.2539 9.74592 16.9108 13.0747 18.2504L14.0035 16.3926C14.2391 15.9214 14.7545 15.659 15.2741 15.7456L20.5972 16.6328C21.1758 16.7292 21.5999 17.2298 21.5999 17.8165V20.3999C21.5999 21.0626 21.0626 21.5999 20.3999 21.5999H17.9999C9.38426 21.5999 2.3999 14.6155 2.3999 5.9999V3.5999Z"
              fill="white"
            />
          </svg>
          Call Now
        </button>
        <button
          className="flex items-center justify-center gap-2 w-44 h-12 lg:w-52 lg:h-16 bg-green-500 rounded-md"
          onClick={() => {
            if (user?.id) {
              handleModalClose();
            } else {
              router.push(
                "/login?redirect_path=/" +
                  currentPath.slice(1).split("/").join("-") +
                  location.search +"#send-message"
              );
            }
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.4039 7.06031L11.9998 11.8583L21.5959 7.06025C21.5235 5.79983 20.4785 4.80005 19.1999 4.80005H4.7999C3.52132 4.80005 2.47626 5.79986 2.4039 7.06031Z"
              fill="white"
            />
            <path
              d="M21.5999 9.74153L11.9998 14.5416L2.3999 9.7416V16.8C2.3999 18.1255 3.47442 19.2 4.7999 19.2H19.1999C20.5254 19.2 21.5999 18.1255 21.5999 16.8V9.74153Z"
              fill="white"
            />
          </svg>
          Send Message
        </button>
      </div>
      <Modal
        isOpen={modal}
        onClose={handleModalClose}
        className="w-full max-w-[600px] p-8 bg-white rounded-lg"
      >
        <Modal.Header>Write your message :</Modal.Header>
        <form onSubmit={handelSubmit} className="w-full space-y-3">
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
        </form>
      </Modal>
    </>
  );
}
