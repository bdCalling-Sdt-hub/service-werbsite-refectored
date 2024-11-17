"use client";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import PageHeading from "@/components/PageHeading";
import Pagination from "@/components/Pagination";
import { useGetPaymentsQuery } from "@/redux/features/payment/paymentApi";
import { TBusiness } from "@/redux/features/users/authSlice";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";

const Account = () => {
  const { user, isLoading: userDataLoading } = useAppSelector(
    (state) => state.auth
  );

  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetPaymentsQuery([
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
    mainServiceId: "",
    mainService: { name: "", id: "" },
    website: "",
    abn: "",
    license: "",
    about: "",
    openHour: "",
    name: "",
    services: [""],
    mobile: "",
    phone: "",
    facebook: "",
    instagram: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
    bsbNumber: "",
  });

  useEffect(() => {
    if (user?.business) {
      // console.log(user);
      const {
        name,
        abn,
        about,
        mainServiceId,
        mainService,
        mobile,
        openHour,
        state,
        postalCode,
        suburb,
        address,
        latitude,
        longitude,
        services,
        facebook,
        instagram,
        license,
        phone,
        website,
        accountNumber,
        accountName,
        bankName,
        bsbNumber,
      } = user?.business as TBusiness;

      setBusinessData({
        name,
        abn,
        about,
        mainServiceId,
        mainService,
        mobile,
        openHour,
        services: services?.length ? [...services] : [""],
        facebook: facebook || "",
        instagram: instagram || "",
        license: license || "",
        phone: phone || "",
        website: website || "",
        accountNumber: accountNumber || "",
        accountName: accountName || "",
        bankName: bankName || "",
        bsbNumber: bsbNumber || "",
      });
      setBusinessData((c) => c);
    }
  }, [user]);

  // console.log(data);
  return (
    <LoaderWraperComp isLoading={isLoading} isError={isError} height="h-[80vh]">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-x-7 gap-y-8 p-8">
        <h3 className="text-xl font-medium col-span-2 -mb-4">Bank Details</h3>
        <div className="w-full flex flex-col">
          <label className="font-medium text-black-500">Account Name</label>
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
            className="h-12 focus:outline-none p-3 rounded border-[#343333] border mt-2"
          />
        </div>
        <div className="w-full flex flex-col">
          <label className="font-medium text-black-500">Bank Name</label>
          <input
            type="text"
            name="bankName"
            placeholder="Bank name"
            value={businessData?.bankName}
            onChange={(e) =>
              setBusinessData({ ...businessData, bankName: e.target.value })
            }
            className="h-12 focus:outline-none p-3 rounded border-[#343333] border mt-2"
          />
        </div>
        <div className="w-full flex flex-col">
          <label className="font-medium text-black-500">BSB Number</label>
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
            className="h-12 focus:outline-none p-3 rounded border-[#343333] border mt-2"
          />
        </div>
        <div className="w-full flex flex-col">
          <label className="font-medium text-black-500">Account Number</label>
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
            className="h-12 focus:outline-none p-3 rounded border-[#343333] border mt-2"
          />
        </div>
        <div className="col-span-2 flex justify-end">
          <button className="bg-mastard-500 text-green-500 py-3 rounded px-8">
            Save
          </button>
        </div>
      </div>
      <hr />
      <div className="min-h-[80vh]">
        <div className="px-[32px] py-[32px] border-b border-[#b7b6b6c9]">
          <PageHeading title={"Payments list"} backPath="/dashboard" />
        </div>
        <div className="max-w-full overflow-x-hidden mt-4">
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
