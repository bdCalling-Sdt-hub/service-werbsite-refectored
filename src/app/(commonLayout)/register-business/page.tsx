"use client";
import { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { CustomSpinner } from "@/components/CustomSpinner";
import { useGetServicesesQuery } from "@/redux/features/services/serviceApi";
import {
  useGetAddressQuery,
  useGetStateQuery,
} from "@/redux/features/address/addressApi";
import { TUniObject } from "@/types";
import { MdKeyboardArrowDown } from "react-icons/md";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [businessData, setBusinessData] = useState({
    mainServiceId: "",
    abn: "",
    license: "",
    about: "",
    name: "",
    address: "",
    suburb: "",
    state: "",
    postalCode: "",
    mobile: "",
    phone: "",
    // services: [""],
    // openHour: "",
    // facebook: "",
    // instagram: "",
  });
  const [searchParams, setSearchParams] = useState({
    main: "",
    suburb: "",
    postalCode: "",
  });
  const [focus, setFocus] = useState<{ [key: string]: boolean }>();
  const { data: serviceData } = useGetServicesesQuery([
    { name: "name", value: searchParams.main },
  ]);
  const { data: addressData } = useGetAddressQuery([
    { name: "state", value: businessData.state },
    { name: "suburb", value: searchParams.suburb },
    { name: "postalCode", value: searchParams.postalCode },
  ]);
  const { data: stateData } = useGetStateQuery(undefined);

  async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const token = Cookies.get("token");
      if (!token) {
        Swal.fire({
          icon: "error",
          text: "Login and try business registration.",
          timer: 1500,
        });
        router.push("/login");
        setIsLoading(false);
        return;
      }
      if (!businessData.mainServiceId) {
        Swal.fire({
          icon: "error",
          text: "Please select a main service form the list.",
        });
        setIsLoading(false);
        return;
      }
      if (isNaN(Number(businessData.abn))) {
        Swal.fire({
          icon: "error",
          text: "Business ABN must be number!",
        });
        setIsLoading(false);
        return;
      }
      const res = await fetch(apiUrl + "businesses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          ...businessData,
          abn: Number(businessData.abn),
        }),
      }).then((res) => res.json());
      if (res.ok) {
        Swal.fire({
          icon: "success",
          text: res.message,
        });
        setIsLoading(false);
        router.push("/dashboard");
      } else {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          text: res.message,
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
  // console.log(businessData);
  // console.log(addressData);
  useEffect(() => {}, [searchParams.main]);
  return (
    <div className="px-3 min-h-screen flex justify-center items-center">
      <form
        className=" rounded-2xl border-green-500 mx-auto border py-16 px-7 lg:px-11 grid grid-cols-1 gap-8 mt-10 "
        onSubmit={handelSubmit}
      >
        <h2 className="text-2xl lg:text-4xl font-medium text-center">
          Tell more about your Business
        </h2>
        <input
          type="text"
          name="businessName"
          placeholder="Business Name"
          value={businessData.name}
          onChange={(e) =>
            setBusinessData({ ...businessData, name: e.target.value })
          }
          required
          className="mt-1 p-3 w-full border border-black-500 rounded placeholder:text-black"
        />
        <div className="relative">
          <input
            type="text"
            name="businessMainCategory"
            placeholder="Business Main Category"
            autoComplete="off"
            onFocus={() => setFocus((c) => ({ ...c, mainCate: true }))}
            onBlur={() =>
              setTimeout(() => {
                setFocus((c) => ({ ...c, mainCate: false }));
              }, 300)
            }
            onChange={(e) => {
              setBusinessData({ ...businessData, mainServiceId: "" });
              setSearchParams((c) => ({ ...c, main: e.target.value }));
            }}
            value={searchParams.main}
            required
            className="mt-1 p-3 w-full border border-black-500 rounded placeholder:text-black "
          />
          {focus?.mainCate && (
            <ul className="w-full absolute bg-slate-200 rounded-b-md shadow-md divide-y divide-gray-100  z-10">
              {serviceData?.data.map((service: any) => (
                <li
                  key={service.id}
                  className="hover:bg-blue-400 hover:text-white py-1.5 px-3 cursor-pointer"
                  onClick={() => {
                    setSearchParams((c) => ({ ...c, main: service.name }));
                    setBusinessData({
                      ...businessData,
                      mainServiceId: service.id,
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
          className="mt-1 p-3 w-full border border-black-500 rounded placeholder:text-black no-spinner"
        />
        <input
          type="text"
          name="license"
          placeholder="Business License(If any)"
          value={businessData.license}
          onChange={(e) =>
            setBusinessData({ ...businessData, license: e.target.value })
          }
          className="mt-1 p-3 w-full border border-black-500 rounded placeholder:text-black"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Business Mobile"
          value={businessData.mobile}
          onChange={(e) =>
            setBusinessData({ ...businessData, mobile: e.target.value })
          }
          required
          className="mt-1 p-3 w-full border border-black-500 rounded placeholder:text-black"
        />
        <input
          type="text"
          name="phone"
          placeholder="Business Phone (Optional)"
          value={businessData.phone}
          onChange={(e) =>
            setBusinessData({ ...businessData, phone: e.target.value })
          }
          className="mt-1 p-3 w-full border border-black-500 rounded placeholder:text-black"
        />

        <h3 className="text-xl font-medium">Business Address</h3>
        <input
          type="text"
          name="address"
          placeholder="Business Address"
          value={businessData.address}
          onChange={(e) =>
            setBusinessData({ ...businessData, address: e.target.value })
          }
          autoComplete="off"
          required
          className="mt-1 p-3 w-full border border-black-500 rounded placeholder:text-black"
        />
        <div className="relative">
          <input
            type="text"
            name="suburb"
            placeholder="Business Suburb"
            autoComplete="off"
            onFocus={() => setFocus((c) => ({ ...c, suburb: true }))}
            onBlur={() =>
              setTimeout(() => {
                setFocus((c) => ({ ...c, suburb: false }));
              }, 300)
            }
            onChange={(e) => {
              setBusinessData({ ...businessData, suburb: "" });
              setSearchParams((c) => ({ ...c, suburb: e.target.value }));
            }}
            value={searchParams.suburb}
            required
            className="mt-1 p-3 w-full border border-black-500 rounded placeholder:text-black "
          />
          {focus?.suburb && (
            <ul className="w-full absolute bg-slate-200 rounded-b-md shadow-md divide-y divide-gray-100  z-10">
              {addressData?.data.map((address: any) => (
                <li
                  key={address.id}
                  className="hover:bg-blue-400 hover:text-white py-1.5 px-3 cursor-pointer"
                  onClick={() => {
                    setSearchParams((c) => ({
                      ...c,
                      postalCode: address.postalCode,
                      suburb: address.suburb,
                    }));
                    setBusinessData({
                      ...businessData,
                      state: address.state,
                      postalCode: address.postalCode,
                      suburb: address.suburb,
                    });
                    setFocus((c) => ({ ...c, suburb: false }));
                  }}
                >
                  {address.suburb}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            name="postalCode"
            placeholder="Postal code"
            autoComplete="off"
            onFocus={() => setFocus((c) => ({ ...c, postalCode: true }))}
            onBlur={() =>
              setTimeout(() => {
                setFocus((c) => ({ ...c, postalCode: false }));
              }, 300)
            }
            onChange={(e) => {
              setBusinessData({ ...businessData, postalCode: "" });
              setSearchParams((c) => ({ ...c, postalCode: e.target.value }));
            }}
            value={searchParams.postalCode}
            required
            className="mt-1 p-3 w-full border border-black-500 rounded placeholder:text-black "
          />
          {focus?.postalCode && (
            <ul className="w-full absolute bg-slate-200 rounded-b-md shadow-md divide-y divide-gray-100  z-10">
              {addressData?.data.map((address: any) => (
                <li
                  key={address.id}
                  className="hover:bg-blue-400 hover:text-white py-1.5 px-3 cursor-pointer"
                  onClick={() => {
                    setSearchParams((c) => ({
                      ...c,
                      suburb: "",
                      postalCode: address.postalCode,
                    }));
                    setBusinessData({
                      ...businessData,
                      suburb: "",
                      postalCode: address.postalCode,
                    });
                    setFocus((c) => ({ ...c, postalCode: false }));
                  }}
                >
                  {address.postalCode}
                </li>
              ))}
            </ul>
          )}
        </div>
        <select
          name="state"
          value={businessData.state}
          onChange={(e) => {
            setSearchParams((c) => ({ ...c, suburb: "", postalCode: "" }));
            setBusinessData({
              ...businessData,
              suburb: "",
              postalCode: "",
              [e.target.name]: e.target.value,
            });
          }}
          required
          className="mt-1 p-3 w-full border border-black-500 rounded placeholder:text-black "
        >
          <option hidden>Select State</option>
          {stateData?.data.map((item: TUniObject, indx: number) => (
            <option key={indx} value={item.state} label={item.state}></option>
          ))}
        </select>
        {/* <input
          type="string"
          name="openingHr"
          placeholder="Opening hours"
          value={data.openHour}
          onChange={(e) => setData({ ...data, openHour: e.target.value })}
          required
          className="mt-1 p-3 w-full border border-black-500 rounded placeholder:text-black col-span-2 "
        />
        <div className="w-full col-span-2 h-80">
          <h3 className="text-xl font-medium pb-4">About Company</h3>
          <ReactQuill
            theme="snow"
            value={data.about}
            onChange={(value) => setData({ ...data, about: value })}
            className="h-3/4"
          />
        </div>
        <div className="w-full col-span-2 flex flex-col">
          <h3 className="text-xl font-medium mb-4">Add your services</h3>
          {data.services?.map((service: any, index: any) => (
            <div className="flex w-full items-center gap-2" key={index}>
              <input
                type="text"
                placeholder="Enter service name"
                className="h-12 w-full focus:outline-none p-3 rounded border-[#343333] border mt-2 "
                defaultValue={service}
                onChange={(e) => {
                  const services = data.services || [];
                  data.services[index] = e.target.value;
                  setData({ ...data, services });
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="minus-circle"
                className="h-10 w-10 cursor-pointer"
                onClick={() => {
                  const services = data.services || [];
                  data.services.splice(index, 1);
                  setData({ ...data, services });
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
              const services = data?.services || [];
              services.push("");
              setData({ ...data, services });
            }}
            className="px-3 py-2.5 w-[calc(100%-46px)] rounded border-[#343333] border font-medium mt-2 text-center"
          >
            Add new service
          </button>
        </div> */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-500 active:bg-green-600 disabled:cursor-not-allowed p-3 text-white rounded-md font-light outline-non disabled:bg-green-500 flex justify-center items-center gap-2"
        >
          Save
          {isLoading && <CustomSpinner />}
        </button>
      </form>
    </div>
  );
}
