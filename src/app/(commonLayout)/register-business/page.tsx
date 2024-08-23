"use client";
import { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { CustomSpinner } from "@/components/CustomSpinner";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
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
  });
  const [services, setServices] = useState<any>([]);
  const [mainFocus, setMainFocus] = useState(false);

  const [suburbFocus, setSuburbFocus] = useState(false);
  const [suburbs, setSuburbs] = useState<any>([]);

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
      if (!data.mainServiceId) {
        Swal.fire({
          icon: "error",
          text: "Please select a main service form the list.",
        });
        setIsLoading(false);
        return;
      }
      if (isNaN(Number(data.abn))) {
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
        body: JSON.stringify({ ...data, abn: Number(data.abn) }),
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
  useEffect(() => {
    try {
      fetch(`${apiUrl}services?name=${searchParams.main}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
            setServices(res.data);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, [searchParams.main]);
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
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          required
          className="mt-1 p-3 w-full border border-black-500 rounded"
        />
        <div className="relative">
          <input
            type="text"
            name="businessMainCategory"
            placeholder="Business Main Category"
            autoComplete="off"
            onFocus={() => setMainFocus(true)}
            onBlur={() =>
              setTimeout(() => {
                setMainFocus(false);
              }, 300)
            }
            onChange={(e) => {
              setData({ ...data, mainServiceId: "" });
              setSearchParams({ main: e.target.value });
            }}
            value={searchParams.main}
            required
            className="mt-1 p-3 w-full border border-black-500 rounded "
          />
          {mainFocus && (
            <ul className="w-full absolute bg-slate-200 rounded-b-md shadow-md divide-y divide-gray-100">
              {services.map((service: any) => (
                <li
                  key={service.id}
                  className="hover:bg-blue-400 hover:text-white py-1.5 px-3 cursor-pointer"
                  onClick={() => {
                    setSearchParams({ main: service.name });
                    setData({ ...data, mainServiceId: service.id });
                    setMainFocus(false);
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
          value={data.abn}
          onChange={(e) => setData({ ...data, abn: e.target.value })}
          required
          style={{ appearance: "textfield", MozAppearance: "textfield" }}
          className="mt-1 p-3 w-full border border-black-500 rounded no-spinner"
        />
        <input
          type="text"
          name="license"
          placeholder="Business License(If any)"
          value={data.license}
          onChange={(e) => setData({ ...data, license: e.target.value })}
          className="mt-1 p-3 w-full border border-black-500 rounded"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Business Mobile"
          value={data.mobile}
          onChange={(e) => setData({ ...data, mobile: e.target.value })}
          required
          className="mt-1 p-3 w-full border border-black-500 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Business Phone (Optional)"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
          className="mt-1 p-3 w-full border border-black-500 rounded"
        />

        <h3 className="text-xl font-medium">Business Address</h3>
        <input
          type="text"
          name="address"
          placeholder="Business Address"
          onFocus={() => setSuburbFocus(true)}
          onBlur={() =>
            setTimeout(() => {
              setSuburbFocus(false);
            }, 300)
          }
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
          autoComplete="off"
          required
          className="mt-1 p-3 w-full border border-black-500 rounded"
        />
        <input
          type="text"
          name="suburb"
          placeholder="Business Suburb"
          value={data.suburb}
          onChange={(e) => setData({ ...data, suburb: e.target.value })}
          required
          className="mt-1 p-3 w-full border border-black-500 rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="Business State"
          value={data.state}
          onChange={(e) => setData({ ...data, state: e.target.value })}
          required
          className="mt-1 p-3 w-full border border-black-500 rounded"
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Business Postal Code"
          value={data.postalCode}
          onChange={(e) => setData({ ...data, postalCode: e.target.value })}
          required
          className="mt-1 p-3 w-full border border-black-500 rounded"
        />
        {/* <input
          type="string"
          name="openingHr"
          placeholder="Opening hours"
          value={data.openHour}
          onChange={(e) => setData({ ...data, openHour: e.target.value })}
          required
          className="mt-1 p-3 w-full border border-black-500 rounded col-span-2 "
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
