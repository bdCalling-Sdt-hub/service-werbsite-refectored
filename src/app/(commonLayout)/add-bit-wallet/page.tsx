"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css";
import { CustomSpinner } from "@/components/CustomSpinner";
import { useGetServicesesQuery } from "@/redux/features/services/serviceApi";
import { useGetAddressQuery } from "@/redux/features/address/addressApi";
import Swal from "sweetalert2";
import { usePostBitMutation } from "@/redux/features/bits/bitsApi";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Page() {
  const router = useRouter();
  const [formDataObj, setFormDataObj] = useState<{ [key: string]: any }>({
    communicationPreference: "",
    serviceId: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File>();
  const [searchQuery, setSearchQuery] = useState<{ [key: string]: any }>();
  const [focus, setFocus] = useState<{ [key: string]: boolean }>();
  const { data: addressData } = useGetAddressQuery([
    {
      name: "postcode",
      value: searchQuery?.postalCode?.slice(0, 4) || "",
    },
    {
      name: "limit",
      value: 100,
    },
  ]);
  const { data: serviceData } = useGetServicesesQuery([
    { name: "name", value: searchQuery?.main || "" },
  ]);
  const [mutaion, { isLoading: muLoading }] = usePostBitMutation();
  async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      // console.log(formDataObj);
      // const token = Cookies.get("token");
      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile);
      }
      for (const [key, value] of Object.entries(formDataObj)) {
        formData.append(key, value);
      }
      const res = await mutaion(formData).unwrap();
      if (res.ok) {
        router.push("/");
        // setFormDataObj({});
        Swal.fire({
          icon: "success",
          text: res.message || "Posting successful!",
        });
      } else {
        Swal.fire({
          icon: "error",
          text: res.message,
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
    <div className="flex items-center justify-center lg:px-10">
      <div className=" min-h-screen w-full flex flex-col justify-center items-start  px-3 py-10">
        <form
          className=" rounded-2xl border-green-500 mx-auto border py-16 px-7 lg:px-11 grid grid-cols-1 gap-6 mt-10 "
          onSubmit={handelSubmit}
        >
          <h2 className="text-2xl lg:text-4xl font-medium text-center mb-6">
            Post for Bids
          </h2>
          <div className="grid grid-cols-10 gap-4 items-center">
            <label className="col-span-2" htmlFor="businessMainCategory">
              Service :{" "}
            </label>
            <div className="relative col-span-8">
              <input
                type="text"
                placeholder="Serivice"
                autoComplete="off"
                onFocus={() => setFocus((c) => ({ ...c, mainCate: true }))}
                onBlur={() =>
                  setTimeout(() => {
                    setFocus((c) => ({ ...c, mainCate: false }));
                  }, 300)
                }
                onChange={(e) => {
                  setFormDataObj({ ...formDataObj, serviceId: "" });
                  setSearchQuery((c) => ({ ...c, main: e.target.value }));
                }}
                value={searchQuery?.main}
                required
                className="p-3 w-full border border-black-500 rounded "
              />
              {focus?.mainCate && (
                <ul className="w-full absolute bg-slate-200 rounded-b-md shadow-md divide-y divide-gray-100  z-10">
                  {serviceData?.data.map((service: any) => (
                    <li
                      key={service.id}
                      className="hover:bg-blue-400 hover:text-white py-1.5 px-3 cursor-pointer"
                      onClick={() => {
                        setSearchQuery((c) => ({ ...c, main: service.name }));
                        setFormDataObj({
                          ...formDataObj,
                          serviceId: service.id,
                        });
                        setFocus((c) => ({ ...c, mainCate: false }));
                      }}
                    >
                      {service.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="grid grid-cols-10 gap-4 items-center">
            <label className="col-span-2">Suburb :</label>
            <div className="col-span-8 relative">
              <div className="relative w-full">
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal code"
                  autoComplete="off"
                  // onFocus={() =>
                  //   setFocus((c) => ({ ...c, postalCode: true }))
                  // }
                  onBlur={() =>
                    setTimeout(() => {
                      setFocus((c) => ({ ...c, postalCode: false }));
                    }, 300)
                  }
                  onChange={(e) => {
                    if (e.target.value && isNaN(Number(e.target.value))) return;

                    setFocus((c) => ({ ...c, postalCode: true }));
                    setFormDataObj((c) => ({
                      ...c,
                      latitude: "",
                      longitude: "",
                    }));

                    // setAllAddress((c) => ({ ...c, postalCode: "" }));
                    setSearchQuery((c) => ({
                      ...c,
                      postalCode: e.target.value,
                    }));
                  }}
                  value={searchQuery?.postalCode || ""}
                  required
                  className="py-3 pl-3 pr-8 w-full border border-black-500 rounded"
                />
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-2 top-3.5"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z"
                    fill="#058240"
                  />
                </svg>
              </div>
              {focus?.postalCode && (
                <ul className="w-full absolute bg-slate-200 rounded-b-md shadow-md divide-y divide-gray-100 text-left z-10 max-h-44 overflow-y-auto">
                  {addressData?.data?.map((address: any) => (
                    <li
                      key={address.id}
                      className="hover:bg-blue-400 hover:text-white py-1.5 px-3 cursor-pointer"
                      onClick={() => {
                        setSearchQuery((c) => ({
                          ...c,
                          postalCode: address.postcode + "-" + address.name,
                        }));
                        setFormDataObj((c) => ({
                          ...c,
                          latitude: address.latitude,
                          longitude: address.longitude,
                        }));
                        // setAllAddress((c) => ({
                        //   ...c,
                        //   postalCode: address.postcode,
                        //   suburb: address.name,
                        //   latitude: address.latitude,
                        //   longitude: address.longitude,
                        // }));
                        setFocus((c) => ({ ...c, postalCode: false }));
                      }}
                    >
                      {address.name}-{address.postcode}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="grid grid-cols-10 gap-4">
            <label className="col-span-2 mt-1">Description :</label>
            <div className="col-span-8">
              <textarea
                value={formDataObj.description}
                onChange={(e) => {
                  setFormDataObj((c) => ({
                    ...c,
                    description: e.target.value,
                  }));
                }}
                required
                placeholder="Des..."
                rows={3}
                cols={50}
                className="p-3 w-full border border-black-500 rounded"
              />
            </div>
          </div>
          <div className="grid grid-cols-10 gap-4">
            <label className="col-span-2 mt-1">Photo :</label>
            <div className="col-span-8">
              <input
                type="file"
                accept="image/*"
                multiple={false}
                className="px-8 py-8 w-full border border-dashed border-black-500 rounded"
                onChange={(e) => {
                  if (e.target.files) {
                    setImageFile(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>
          <div className="flex gap-4 py-4">
            <label className="col-span-2">
              Commnication preference :
            </label>
            <div className="col-span-8 space-y-1 flex justify-start items-center gap-5">
              <div className="w-20 flex justify-between gap-3 items-center">
                <span>Phone</span>
                <input
                  type="checkbox"
                  name="call"
                  required={!formDataObj?.communicationPreference}
                  checked={formDataObj?.communicationPreference === "call"}
                  onChange={() => {
                    setFormDataObj({
                      ...formDataObj,
                      communicationPreference: "call",
                    });
                  }}
                  className="size-5 active:ring-2 ring-offset-1 transition-all"
                />
              </div>
              <p className="">or</p>
              <div className="w-20 flex justify-between gap-3 items-center">
                <span>Email</span>
                <input
                  type="checkbox"
                  name="email"
                  required={!formDataObj?.communicationPreference}
                  checked={formDataObj?.communicationPreference === "email"}
                  onChange={() => {
                    setFormDataObj({
                      ...formDataObj,
                      communicationPreference: "email",
                    });
                  }}
                  className="size-5 active:ring-2 ring-offset-1 transition-all"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={muLoading}
            className="mx-auto bg-green-500 active:bg-green-600 disabled:cursor-not-allowed w-40 px-8 py-3 text-white rounded-md font-light outline-non disabled:bg-green-500 flex justify-center items-center gap-2"
          >
            Save
            {muLoading && <CustomSpinner />}
          </button>
        </form>
      </div>
    </div>
  );
}
