"use client";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import PageHeading from "@/components/PageHeading";
import Pagination from "@/components/Pagination";
import { useGetPaymentsQuery } from "@/redux/features/payment/paymentApi";
import { TBusiness } from "@/redux/features/users/authSlice";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { CustomSpinner } from "@/components/CustomSpinner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

const Account = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoading: userDataLoading } = useAppSelector(
    (state) => state.auth
  );

  const [currentPage, setCurrentPage] = useState(1);
  const {
    data,
    isLoading: paymentLoading,
    isError,
  } = useGetPaymentsQuery([
    {
      name: "limit",
      value: 15,
    },
    {
      name: "page",
      value: currentPage,
    },
  ]);
  const [businessData, setBusinessData] = useState({
    // mainServiceId: "",
    // mainService: { name: "", id: "" },
    // website: "",
    // abn: "",
    // license: "",
    // about: "",
    // openHour: "",
    // name: "",
    // services: [""],
    // mobile: "",
    // phone: "",
    // facebook: "",
    // instagram: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
    bsbNumber: "",
  });

  useEffect(() => {
    if (user?.business) {
      // console.log(user);
      const {
        // name,
        // abn,
        // about,
        // mainServiceId,
        // mainService,
        // mobile,
        // openHour,
        // services,
        // facebook,
        // instagram,
        // license,
        // phone,
        // website,
        accountNumber,
        accountName,
        bankName,
        bsbNumber,
      } = user?.business as TBusiness;

      setBusinessData({
        // name,
        // abn,
        // about,
        // mainServiceId,
        // mainService,
        // mobile,
        // openHour,
        // services: services?.length ? [...services] : [""],
        // facebook: facebook || "",
        // instagram: instagram || "",
        // license: license || "",
        // phone: phone || "",
        // website: website || "",
        accountNumber: accountNumber || "",
        accountName: accountName || "",
        bankName: bankName || "",
        bsbNumber: bsbNumber || "",
      });
      setBusinessData((c) => c);
    }
  }, [user]);
  async function handelEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = Cookies.get("token");
      const businessRes = await fetch(
        apiUrl + "businesses/" + user?.business?.id,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...businessData,
          }),
        }
      );
      const businessResult = await businessRes.json();
      if (businessResult.ok) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          text: "Updating successful!",
        });
      } else {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          text: businessResult.message,
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
    <LoaderWraperComp
      isLoading={paymentLoading}
      isError={isError}
      height="h-[80vh]"
    >
      <form onSubmit={handelEdit} className=" space-y-5 p-4 lg:p-8">
        <h3 className="text-xl font-medium col-span-2 -mb-4 w-full">
          Bank Details
        </h3>
        <div className="w-full lg:flex gap-6 space-y-5 lg:space-y-0">
          <div className="w-full">
            <label className="font-medium text-black-500 block">
              Account Name
            </label>
            <input
              type="text"
              name="accountName"
              placeholder="Bank account name"
              value={businessData?.accountName}
              onChange={(e) =>
                setBusinessData({
                  ...businessData,
                  accountName: e.target.value,
                })
              }
              className="h-12 focus:outline-none p-3 rounded border-[#343333] border mt-2 w-full"
            />
          </div>
          <div className="w-full">
            <label className="font-medium text-black-500 block">
              Bank Name
            </label>
            <input
              type="text"
              name="bankName"
              placeholder="Bank name"
              value={businessData?.bankName}
              onChange={(e) =>
                setBusinessData({ ...businessData, bankName: e.target.value })
              }
              className="h-12 focus:outline-none p-3 rounded border-[#343333] border mt-2 w-full"
            />
          </div>
        </div>
        <div className="w-full lg:flex gap-6 space-y-5 lg:space-y-0">
          <div className="w-full">
            <label className="font-medium text-black-500 block">
              BSB Number
            </label>
            <input
              type="text"
              name="bsbNumber"
              placeholder="BSB number"
              value={businessData?.bsbNumber}
              onChange={(e) =>
                setBusinessData({
                  ...businessData,
                  bsbNumber: e.target.value,
                })
              }
              className="h-12 focus:outline-none p-3 rounded border-[#343333] border mt-2 w-full"
            />
          </div>
          <div className="w-full">
            <label className="font-medium text-black-500 block">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              placeholder="Bank account number"
              value={businessData?.accountNumber}
              onChange={(e) =>
                setBusinessData({
                  ...businessData,
                  accountNumber: e.target.value,
                })
              }
              className="h-12 focus:outline-none p-3 rounded border-[#343333] border mt-2 w-full"
            />
          </div>
        </div>
        <div className="col-span-2 flex justify-end">
          <button className="w-[220px] bg-mastard-500 active:bg-mastard-600 disabled:cursor-not-allowed p-3 text-green-500 rounded-md col-span-2 font-light outline-non disabled:bg-green-500 disabled:text-white flex justify-center items-center gap-2">
            Save {isLoading && <CustomSpinner />}
          </button>
        </div>
      </form>
      <div className="min-h-[80vh] min-w-[1000px] w-full overflow-x-auto">
        <div className="px-[32px] py-[32px] border-b border-[#b7b6b6c9]">
          <PageHeading title={"Payments list"} backPath="/dashboard" />
        </div>
        <div className="mt-4 overflow-y-auto">
          <div className="w-[600px] lg:w-full">
            <div className="grid grid-cols-12 gap-3 px-4 lg:px-10 py-3 bg-green-200 font-medium text-start">
              <p className="col-span-2">#SI</p>
              <p className="col-span-2">Subscription</p>
              <p className="col-span-2 text-center">Amount</p>
              <p className="col-span-3">Transaction Id</p>
              <p className="col-span-3 ">Date</p>
            </div>
            {data?.data.map((item: any, index: number) => (
              <div
                key={index}
                className={`grid grid-cols-12 gap-3 px-4 lg:px-10 py-5 ${
                  index % 2 !== 0 && " bg-gray-50"
                }`}
              >
                <p className="col-span-2">
                  {index < 10 ? "0" + ++index : ++index}
                </p>
                <p className="col-span-2">{item.subscription?.name}</p>
                <p className="col-span-2 text-center">$ {item.amount}</p>
                <p className="col-span-3 truncate">{item.transactionId}</p>
                <p className="col-span-3">{item.createdAt.split("T")[0]}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={
                data?.pagination?.totalPage > 1
                  ? data?.pagination?.totalPage
                  : 0
              }
            />
          </div>
        </div>
      </div>
    </LoaderWraperComp>
  );
};

export default Account;
