import Image from "next/image";
import Link from "next/link";
import BusinessContact from "./business/BusinessContact";
import businessLogo from "@/assets/images/business-image.png";
import generateStars from "./business/generateStar";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import Modal from "./Reusable/Modal";
import { CustomSpinner } from "./CustomSpinner";
import { usePostReferMutation } from "@/redux/features/referral/referallApi";
import Swal from "sweetalert2";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

function BusinessCart({
  data,
  refer = false,
}: {
  data: { [key: string]: any };
  refer?: boolean;
}) {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [referMutation, { isLoading }] = usePostReferMutation();
  const handleModalClose = () => {
    setModal(false);
  };
  async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await referMutation({
        businessId: data.id,
        ...formData,
      }).unwrap();
      handleModalClose();
      Swal.fire({
        icon: "success",
        title: "Success!!",
        text: res.message,
      });
      setFormData({});
    } catch (error: any) {
      handleModalClose();
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again later.",
      });
    }
  }

  return (
    <>
      <div className="p-4 lg:p-6 rounded-xl border-2 border-green-500 hover:bg-green-50 transition-all relative">
        <div className="flex items-start gap-3">
          <Link href={"/business/" + data.id}>
            <div className="lg:w-32 w-20 h-full">
              <Image
                src={
                  data.user?.image ? apiUrl + data?.user?.image : businessLogo
                }
                alt={data.name}
                className="rounded-full lg:w-32 lg:h-32 w-20 h-20"
                width={150}
                height={150}
                priority
              />
            </div>
          </Link>
          <div className="space-y-2 lg:space-y-4">
            <div className="flex lg:justify-start items-center lg:items-end gap-3">
              <Link
                href={"/business/" + data.id}
                className="lg:text-2xl font-medium hover:text-green-500"
              >
                {data.name}
              </Link>
              <div className="flex justify-start gap-1.5">
                {/* <span className="pr-1">Ratings :</span>  */}
                {generateStars(5)}
                {`[${data._count?.reviews}]`}
              </div>
            </div>
            <ul className="flex flex-wrap items-center gap-3 text-white font-extralight">
              {/* <RiCustomerService2Line size={18} className="text-[#058240]"/> */}
              {data?.services?.map((skill: any, index: any) => (
                <li
                  key={index}
                  className="p-1 px-2.5 bg-green-500 rounded-2xl text-[12px]"
                >
                  {skill}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 text-xs lg:text-base text-slate-600">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden lg:block"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z"
                  fill="#058240"
                />
              </svg>
              {[data?.address, data?.suburb, data?.state].map(
                (item: string | undefined, index: number) =>
                  item && index !== 0 ? ", " + item : item
              )}
            </div>
            {/* <div
          className="line-clamp-3"
          dangerouslySetInnerHTML={{ __html: data?.about }}
        /> */}
          </div>
        </div>
        <div className="flex gap-2 lg:gap-4 items-center mt-4">
          {refer ? (
            <button
              onClick={() => setModal(true)}
              className="flex items-center justify-center gap-1 lg:gap-2 px-4 py-2 lg:px-8 lg:py-3 bg-mastard-500 rounded-md text-green-500 lg:text-base text-xs"
            >
              Refer
            </button>
          ) : (
            <>
              <BusinessContact
                email={data?.user?.email}
                number={data.mobile}
                businessId={data.id}
              />

              <Link href={`/business/${data.id}`}>
                <button className="flex items-center justify-center gap-1 lg:gap-2 px-4 py-2 lg:px-8 lg:py-3 bg-mastard-500 rounded-md text-green-500 lg:text-base text-xs">
                  See more...
                </button>
              </Link>
            </>
          )}
        </div>
        {data.promotion && (
          <div
            className="absolute top-1 lg:top-2 left-1 lg:left-auto lg:right-2 text-center"
            data-tooltip-id={data.id}
            data-tooltip-content={data?.promotion?.title}
          >
            <Tooltip id={data.id} />
            <h6 className="text-xl lg:text-3xl">
              {data?.promotion?.discount}%
            </h6>
            <p className="hidden lg:block text-base">DISCOUNT</p>
          </div>
        )}
      </div>
      <Modal
        isOpen={modal}
        onClose={handleModalClose}
        className="w-full max-w-[600px] p-8 bg-white rounded-lg"
      >
        <Modal.Header>
          <p className="text-center text-xl font-semibold mb-4 w-full ">
            Provide referral details
          </p>
        </Modal.Header>
        <form onSubmit={handelSubmit} className="w-full space-y-4">
          <div>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              placeholder="John Doe"
              value={formData?.name}
              onChange={(e) =>
                setFormData((c) => ({ ...c, [e.target.name]: e.target.value }))
              }
              required
              className="p-3 w-full border border-black-500 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              placeholder="john@gmail.com"
              value={formData?.email}
              onChange={(e) =>
                setFormData((c) => ({ ...c, [e.target.name]: e.target.value }))
              }
              required
              className="p-3 w-full border border-black-500 rounded-md focus:outline-none mt-1"
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <div className="relative mt-1 ">
              <span className="absolute left-2.5 inset-0 flex items-center w-fit">
                +61
              </span>
              <input
                type="text"
                name="phone"
                required
                placeholder="6646545***"
                autoComplete="off"
                value={formData.phone || ""}
                onChange={(e) => {
                  if (e.target.value && isNaN(Number(e.target.value))) return;
                  setFormData({ ...formData, phone: e.target.value });
                }}
                maxLength={9}
                className="pl-10 p-3 w-full border border-black-500 rounded-md focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-mastard-500 active:bg-mastard-600 disabled:cursor-not-allowed py-3 px-10 text-green-500 rounded-md col-span-2 font-light outline-non disabled:bg-green-500 disabled:text-white flex justify-center items-center gap-2"
            >
              Confirm
              {isLoading && <CustomSpinner />}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default BusinessCart;
