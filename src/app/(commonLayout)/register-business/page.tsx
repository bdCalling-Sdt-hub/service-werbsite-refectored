"use client";
import { useState, useRef, useEffect, useContext, use } from "react";
import { useRouter } from "next/navigation";
// import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { CustomSpinner } from "@/components/CustomSpinner";
import { useGetServicesesQuery } from "@/redux/features/services/serviceApi";
import { useAppSelector } from "@/redux/hooks";
import GooglePlaceAddress from "@/components/GooglePlaceAddress";
import { TGPlaceAddress } from "@/types";
import Image from "next/image";
import authUndraw from "@/assets/images/auth-undraw.png";

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
    mobile: "",
    phone: "",
    // services: [""],
    // openHour: "",
    // facebook: "",
    // instagram: "",
  });
  const [allAddress, setAllAddress] = useState<TGPlaceAddress>({
    address: "",
    postalCode: "",
    state: "",
    suburb: "",
    latitude: null,
    longitude: null,
  });
  const { user, isLoading: userLoading } = useAppSelector(
    (state) => state.auth
  );
  const [searchParams, setSearchParams] = useState({
    main: "",
  });
  const [focus, setFocus] = useState<{ [key: string]: boolean }>();
  const { data: serviceData } = useGetServicesesQuery([
    { name: "name", value: searchParams.main },
  ]);

  async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const curreentUrl = window.location.origin;
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

      if(!allAddress.latitude || !allAddress.longitude){
        Swal.fire({
          icon: "error",
          text: "Please select a valid address from Street Address drop down.",
        });
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
      // return console.log({
      //   ...businessData,
      //   ...allAddress,
      //   abn: Number(businessData.abn),
      //   cancelUrl: curreentUrl + "/dashboard/upgrade-plane",
      //   successUrl: curreentUrl + "/dashboard",
      // });
      const res = await fetch(apiUrl + "businesses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          ...businessData,
          ...allAddress,
          abn: Number(businessData.abn),
          cancelUrl: curreentUrl + "/dashboard/upgrade-plane",
          successUrl: curreentUrl + "/dashboard",
        }),
      }).then((res) => res.json());
      if (res.ok) {
        setIsLoading(false);
        window.location = res?.data?.url || "/dashboard";
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
  // useEffect(() => {
  //   if (!isLoading && user?.business) {
  //     router.push("/dashboard");
  //   }
  // }, [user?.business]);
  return (
    <div className="flex items-center justify-center lg:px-10">
      <div className="w-3/4 lg:w-3/5 pl-6 hidden lg:block">
        <Image
          src={authUndraw}
          alt="authentication"
          width={1000}
          height={1000}
        />
      </div>
      <div className=" min-h-screen w-full flex flex-col justify-center items-start  px-3 py-10">
        <form
          className=" rounded-2xl border-green-500 mx-auto border py-16 px-7 lg:px-11 grid grid-cols-1 gap-6 mt-10 "
          onSubmit={handelSubmit}
        >
          <h2 className="text-2xl lg:text-4xl font-medium text-center">
            Tell more about your Business
          </h2>
          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            autoComplete="off"
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
            autoComplete="off"
            value={businessData.abn}
            onChange={(e) => {
              if (e.target.value && isNaN(Number(e.target.value))) return;
              setBusinessData({ ...businessData, abn: e.target.value });
            }}
            required
            style={{ appearance: "textfield", MozAppearance: "textfield" }}
            className="mt-1 p-3 w-full border border-black-500 rounded placeholder:text-black no-spinner"
          />
          <input
            type="text"
            name="license"
            autoComplete="off"
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
            autoComplete="off"
            value={businessData.mobile}
            onChange={(e) => {
              if (e.target.value && isNaN(Number(e.target.value))) return;
              setBusinessData({ ...businessData, mobile: e.target.value });
            }}
            required
            className="mt-1 p-3 w-full border border-black-500 rounded placeholder:text-black"
          />
          <input
            type="text"
            name="phone"
            placeholder="Business Phone (Optional)"
            autoComplete="off"
            value={businessData.phone}
            onChange={(e) => {
              if (e.target.value && isNaN(Number(e.target.value))) return;
              setBusinessData({ ...businessData, phone: e.target.value });
            }}
            className="mt-1 p-3 w-full border border-black-500 rounded placeholder:text-black"
          />
          <h3 className="text-xl font-medium">Business Address</h3>
          <GooglePlaceAddress
            allAddress={allAddress}
            setAllAddress={setAllAddress}
          />
          {/* 
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
        </select> */}
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
    </div>
  );
}
