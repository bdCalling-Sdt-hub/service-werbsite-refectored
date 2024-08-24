"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetBunsinessQuery } from "@/redux/features/business/businessApi";
import { useGetServicesesQuery } from "@/redux/features/services/serviceApi";
import businessImage from "@/assets/images/business-image.png";
import { useGetAddressQuery } from "@/redux/features/address/addressApi";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<{ [key: string]: any }>();
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [suburbFocus, setSuburbFocus] = useState(false);
  const { data: servicesData } = useGetServicesesQuery([
    { name: "name", value: search },
  ]);
  const { data: businessData } = useGetBunsinessQuery([
    { name: "name", value: search },
  ]);
  const { data: addressData } = useGetAddressQuery([
    { name: "postalCode", value: postcode },
    { name: "limit", value: 5 },
  ]);

  function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !searchQuery?.serviceId ||
      !searchQuery?.postalCode ||
      !searchQuery?.suburb
    ) {
      return setSearchQuery((c) => ({
        ...c,
        message: "Select service name and postcode from dropdown!",
      }));
    }
    router.push(
      `/business?service=${searchQuery?.serviceId}&postcode=${searchQuery?.postalCode}&suburb=${searchQuery?.suburb}`
    );
  }
  return (
    <header>
      <div className="relative hidden lg:block h-40 w-full ">
        <Image src="/header.png" alt="header" fill />
      </div>
      <div className="text-center py-36 flex flex-col items-center bg-mastard-500 mx-auto">
        <h1 className="text-green-800 text-3xl lg:text-5xl font-semibold">
          Choose Your Best & Affordable Service
          <br />
          Provider Your Way
        </h1>
        <p className="my-4 font-Montserrat">
          Now You Can Connect instantly Service Provider in Your Area
        </p>
        <div>
          <form
            className="flex flex-col lg:flex-row my-2 font-Montserrat items-center gap-1 mx-auto"
            onSubmit={handelSubmit}
          >
            <div className="flex flex-col lg:flex-row items-center text-black-500">
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  value={search}
                  required
                  autoComplete="off"
                  onFocus={() => setSearchActive(true)}
                  onBlur={() =>
                    setTimeout(() => {
                      setSearchActive(false);
                    }, 300)
                  }
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSearchQuery((c) => ({ ...c, message: "" }));
                  }}
                  className="lg:w-[391px] h-12 focus:outline-none p-3 rounded border-[#343333] border border-r-0 font-medium"
                  placeholder="What services are you looking for"
                />
                {searchActive && (
                  <ul className="absolute bg-white shadow-md w-full text-lg rounded-b-lg max-h-60 overflow-y-auto">
                    {businessData?.data &&
                      search.length > 0 &&
                      businessData?.data.map((business: any, index: number) => (
                        <li
                          key={index}
                          onClick={() =>
                            router.push("/business/" + business.id)
                          }
                          // onClick={() => setSearch(business.businessName)}
                          className="text-black-500 py-2 hover:bg-slate-100 cursor-pointer flex gap-2 px-4 mb-1"
                        >
                          <div className="h-16 w-20">
                            <Image
                              src={
                                business?.user.image
                                  ? apiUrl + business?.user.image
                                  : businessImage
                              }
                              alt={business.names}
                              width={100}
                              height={100}
                              className="rounded w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-start">
                            <p className="text-lg font-medium">
                              {business.name}
                            </p>
                            <span className="text-sm">{business.address}</span>
                          </div>
                        </li>
                      ))}
                    {servicesData?.data.length > 0 && (
                      <li className="text-white py-2 bg-black">Services</li>
                    )}
                    {servicesData?.data.map((service: any, index: number) => (
                      <li
                        key={index}
                        className="py-2 hover:bg-slate-100 cursor-pointer text-left px-4"
                        onClick={() => {
                          setSearch(service.name);
                          setSearchQuery((c) => ({
                            ...c,
                            message: "",
                            serviceId: service.id,
                          }));
                        }}
                      >
                        {service.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="relative flex items-center">
                <input
                  className="w-[208px] h-12 pl-9  rounded border-[#343333] border focus:outline-none font-medium"
                  name="postcode"
                  type="text"
                  onFocus={() => setSuburbFocus(true)}
                  onBlur={() => setTimeout(() => setSuburbFocus(false), 300)}
                  value={postcode}
                  onChange={(e) => {
                    setSearchQuery((c) => ({ ...c, message: "" }));
                    setPostcode(e.target.value);
                  }}
                  placeholder="Post Code"
                  autoComplete="off"
                  required
                />
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute ml-3"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z"
                    fill="#058240"
                  />
                </svg>
                {suburbFocus && (
                  <ul className="w-full absolute bg-slate-200 rounded-b-md shadow-sm top-12">
                    {addressData?.data.map((item: any, index: any) => (
                      <li
                        key={index}
                        className="hover:bg-slate-300 p-2 cursor-pointer text-left"
                        onClick={() => {
                          setPostcode(item.suburb + "-" + item.postalCode);
                          setSuburbFocus(false);
                          setSearchQuery((c) => ({
                            ...c,
                            message: "",
                            suburb: item.suburb,
                            postalCode: item.postalCode,
                          }));
                        }}
                      >
                        {item.suburb + " - " + item.postalCode}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <button className="flex items-center gap-2 rounded-t-[3px] py-3 px-3 bg-green-900 text-white">
              Search{" "}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 16.25L16.25 3.75M16.25 3.75H6.875M16.25 3.75V13.125"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
          {searchQuery?.message && (
            <small className="text-red-500 text-sm block w-full -mt-1.5 text-left">
              {searchQuery?.message}
            </small>
          )}
        </div>
      </div>
    </header>
  );
}
