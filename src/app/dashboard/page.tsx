"use client";
import "react-quill/dist/quill.snow.css";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import BusinessRegisterSuggation from "@/components/BusinessRegisterSuggation";
import dynamic from "next/dynamic";
import { TBusiness, TUser } from "@/redux/features/users/authSlice";
import Swal from "sweetalert2";
import { CustomSpinner } from "@/components/CustomSpinner";
import profileDemo from "@/assets/images/profile-demo.jpg";
import { PiCameraPlusBold } from "react-icons/pi";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { useGetServicesesQuery } from "@/redux/features/services/serviceApi";
import GooglePlaceAddress from "@/components/GooglePlaceAddress";
import { TGPlaceAddress } from "@/types";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Page() {
  const router = useRouter();
  const { user, isLoading: userDataLoading } = useAppSelector(
    (state) => state.auth
  );
  const [allAddress, setAllAddress] = useState<TGPlaceAddress>({
    address: "",
    postalCode: "",
    state: "",
    suburb: "",
    latitude: null,
    longitude: null,
  });
  const [userData, setUserData] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    main: "",
  });
  const [focus, setFocus] = useState<{ [key: string]: boolean }>();
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
  const { data: serviceData } = useGetServicesesQuery([
    { name: "name", value: searchParams.main },
  ]);

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
      setSearchParams({ main: mainService.name });
      setBusinessData((c) => c);
      setAllAddress({
        state,
        postalCode,
        suburb,
        address,
        latitude,
        longitude,
      });
    }
    setUserData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    });
  }, [user]);

  // if (!userDataLoading && !user) router.push("/login");

  async function handelEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userData.newPassword || userData.confirmPassword) {
      if (userData.newPassword !== userData.confirmPassword) {
        Swal.fire({
          icon: "error",
          text: "new password and confirm password not matched",
        });
        return;
      }
    }
    if (isNaN(Number(businessData.abn))) {
      Swal.fire({
        icon: "error",
        text: "Business ABN must be number!",
      });
      return;
    }
    setIsLoading(true);
    try {
      const token = Cookies.get("token");
      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile);
      }
      for (const [key, value] of Object.entries(userData)) {
        formData.append(key, value);
      }
      const res = await fetch(apiUrl + "users/" + user?.id, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });
      const result = await res.json();
      if (result.ok) {
        if (user?.business) {
          // return  console.log({ ...businessData, ...allAddress });
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
                ...allAddress,
                abn: Number(businessData.abn),
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
        } else {
          setIsLoading(false);
          Swal.fire({
            icon: "success",
            text: result.message,
          });
        }
      } else {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          text: result.message,
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
    <section className="rounded-2xl p-8 lg:p-14 max-w-4xl lg:max-w-5xl mx-auto">
      <h1 className="font-medium text-2xl lg:text-4xl py-10">
        Business Information
      </h1>
      <LoaderWraperComp isError={false} isLoading={userDataLoading}>
        <form className=" flex flex-col gap-8" onSubmit={handelEdit}>
          {/* profile information */}
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-x-7 gap-y-8">
            <div className="w-full flex flex-col">
              <label className="font-medium text-black-500">First Name</label>
              <input
                type="text"
                name="name"
                value={userData.firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
                required
                className="h-12 focus:outline-none p-3 rounded border-[#343333] border font-medium mt-2"
                placeholder="Name"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="font-medium text-black-500">Last Name</label>
              <input
                type="text"
                name="name"
                required
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
                value={userData.lastName}
                className="h-12 focus:outline-none p-3 rounded border-[#343333] border font-medium mt-2"
                placeholder="Name"
              />
            </div>
          </div>
          {/* business information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-7 gap-y-8">
            <div className="w-full flex flex-col">
              <label className="font-medium text-black-500">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={businessData.name}
                onChange={(e) =>
                  setBusinessData({ ...businessData, name: e.target.value })
                }
                required
                className="h-12 focus:outline-none p-3 rounded border-[#343333] border font-medium mt-2"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="font-medium text-black-500">
                Business Main Category
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="businessMainCategory"
                  placeholder="Business Main Category"
                  autoComplete="off"
                  onFocus={() => setFocus((c) => ({ ...c, main: true }))}
                  onBlur={() =>
                    setTimeout(() => {
                      setFocus((c) => ({ ...c, main: false }));
                    }, 300)
                  }
                  onChange={(e) => {
                    setBusinessData({ ...businessData, mainServiceId: "" });
                    setSearchParams((c) => ({ ...c, main: e.target.value }));
                  }}
                  value={searchParams.main}
                  required
                  className="w-full h-12 focus:outline-none p-3 rounded border-[#343333] border font-medium mt-2"
                />
                {focus?.main && (
                  <ul className="w-full absolute bg-slate-200 rounded-b-md shadow-lg divide-y divide-gray-100">
                    {serviceData?.data.map((service: any) => (
                      <li
                        key={service.id}
                        className={
                          "hover:bg-blue-400 hover:text-white py-1.5 px-3 cursor-pointer"
                        }
                        onClick={() => {
                          setSearchParams((c) => ({
                            ...c,
                            main: service.name,
                          }));
                          setBusinessData({
                            ...businessData,
                            mainServiceId: service.id,
                          });
                          setFocus((c) => ({ ...c, main: false }));
                        }}
                      >
                        {service.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col">
              <label className="font-medium text-black-500">Business ABN</label>
              <input
                type="text"
                name="abn"
                placeholder="Business ABN"
                value={businessData.abn}
                onChange={(e) =>
                  setBusinessData({ ...businessData, abn: e.target.value })
                }
                required
                style={{ appearance: "textfield", MozAppearance: "textfield" }}
                className="h-12 focus:outline-none p-3 rounded border-[#343333] border font-medium mt-2"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="font-medium text-black-500">
                Business License(If any)
              </label>
              <input
                type="text"
                name="license"
                placeholder="Business License"
                value={businessData.license}
                onChange={(e) =>
                  setBusinessData({ ...businessData, license: e.target.value })
                }
                className="h-12 focus:outline-none p-3 rounded border-[#343333] border font-medium mt-2"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="font-medium text-black-500">
                Business Mobile
              </label>
              <input
                type="text"
                name="mobile"
                placeholder="Business Mobile"
                value={businessData.mobile}
                onChange={(e) =>
                  setBusinessData({ ...businessData, mobile: e.target.value })
                }
                required
                className="h-12 focus:outline-none p-3 rounded border-[#343333] border font-medium mt-2"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="font-medium text-black-500">
                Business Phone (Optional)
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Business Phone"
                value={businessData.phone}
                onChange={(e) =>
                  setBusinessData({ ...businessData, phone: e.target.value })
                }
                className="h-12 focus:outline-none p-3 rounded border-[#343333] border font-medium mt-2"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="font-medium text-black-500">
                Opening hours
              </label>
              <input
                type="string"
                name="openingHr"
                placeholder="Opening hours"
                value={businessData.openHour}
                onChange={(e) =>
                  setBusinessData({ ...businessData, openHour: e.target.value })
                }
                required
                className="h-12 focus:outline-none p-3 rounded border-[#343333] border mt-2"
              />
            </div>
            <h3 className="text-xl font-medium col-span-2">Business Address</h3>
            <div className="col-span-2 space-y-7">
              <GooglePlaceAddress
                allAddress={allAddress}
                setAllAddress={setAllAddress}
              />
            </div>
            <h3 className="text-xl font-medium col-span-2 -mb-4">
              Bank Details
            </h3>
            <div className="w-full flex flex-col">
              <label className="font-medium text-black-500">
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
                className="h-12 focus:outline-none p-3 rounded border-[#343333] border mt-2"
              />
            </div>
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
            <h3 className="text-xl font-medium col-span-2 -mb-4">
              Social media links
            </h3>
            <div className="w-full flex flex-col">
              <label className="font-medium text-black-500">Website</label>
              <input
                type="text"
                name="website"
                placeholder="Business Website (If any)"
                value={businessData.website}
                onChange={(e) =>
                  setBusinessData({ ...businessData, website: e.target.value })
                }
                className="h-12 focus:outline-none p-3 rounded border-[#343333] border mt-2"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="font-medium text-black-500">Facebook</label>
              <input
                type="text"
                name="facebook"
                placeholder="Facebook Link (If any)"
                value={businessData.facebook}
                onChange={(e) =>
                  setBusinessData({ ...businessData, facebook: e.target.value })
                }
                className="h-12 focus:outline-none p-3 rounded border-[#343333] border mt-2"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="font-medium text-black-500">Insagram</label>
              <input
                type="text"
                name="instagram"
                placeholder="Instagram Link (If any)"
                value={businessData.instagram}
                onChange={(e) =>
                  setBusinessData({
                    ...businessData,
                    instagram: e.target.value,
                  })
                }
                className="h-12 focus:outline-none p-3 rounded border-[#343333] border mt-2"
              />
            </div>
            <div className="w-full col-span-2 flex flex-col">
              <h3 className="text-xl font-medium mb-4">Add your services</h3>
              {businessData.services?.map((service: any, index: any) => (
                <div className="flex w-full items-center gap-2" key={index}>
                  <input
                    type="text"
                    placeholder="Enter service name"
                    className="h-12 w-full focus:outline-none p-3 rounded border-[#343333] border mt-2 "
                    defaultValue={service}
                    onChange={(e) => {
                      const services = businessData.services || [];
                      businessData.services[index] = e.target.value;
                      setBusinessData({ ...businessData, services });
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="minus-circle"
                    className="h-10 w-10 cursor-pointer"
                    onClick={() => {
                      const services = businessData.services || [];
                      businessData.services.splice(index, 1);
                      setBusinessData({ ...businessData, services });
                    }}
                  >
                    <path
                      fill="#B5B5B5"
                      d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Zm4-9H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Z"
                    ></path>
                  </svg>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const services = businessData?.services || [];
                  services.push("");
                  setBusinessData({ ...businessData, services });
                }}
                className="px-3 py-2.5 w-[calc(100%-46px)] rounded border-[#343333] border font-medium mt-2 text-center"
              >
                Add new service
              </button>
            </div>
            <div className="my-10 flex items-center gap-4 relative">
              <Image
                src={
                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : user?.image
                    ? apiUrl + "/" + user?.image
                    : profileDemo
                }
                alt="profile"
                className="rounded border"
                width={120}
                height={120}
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  multiple={false}
                  name="profileImage"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef?.current?.click()}
                  className="rounded-t-[3px] py-2 px-3 border-white bg-green-400 text-white font-light flex items-center gap-1"
                >
                  Upload Logo <PiCameraPlusBold />
                </button>
              </div>
            </div>
            <div className="col-span-2 w-full h-80">
              <h3 className="text-xl font-medium pb-4">About Company</h3>
              <ReactQuill
                theme="snow"
                value={businessData.about}
                onChange={(value) =>
                  setBusinessData({ ...businessData, about: value })
                }
                className="h-3/4"
              />
            </div>
          </div>
          <div className="mt-3 flex justify-center lg:justify-start">
            <button
              disabled={isLoading}
              className="w-[220px] bg-green-500 active:bg-green-600 disabled:cursor-not-allowed p-3 text-white rounded-md col-span-2 font-light outline-non disabled:bg-green-500 flex justify-center items-center gap-2"
            >
              Save Changes {isLoading && <CustomSpinner />}
            </button>
          </div>
        </form>
      </LoaderWraperComp>
      {user?.type === "PROVIDER" && !user.business && (
        <BusinessRegisterSuggation />
      )}
    </section>
  );
}
