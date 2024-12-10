"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetBunsinessQuery } from "@/redux/features/business/businessApi";
import { useGetServicesesQuery } from "@/redux/features/services/serviceApi";
import businessImage from "@/assets/images/business-image.png";
import { TGPlaceAddress, TUniObject } from "@/types";
import { useGetAddressQuery } from "@/redux/features/address/addressApi";
import BusinessCart from "@/components/BusinessCart";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function BusinessList() {
  const router = useRouter();
  const [allAddress, setAllAddress] = useState<TGPlaceAddress>({
    address: "",
    postalCode: "",
    state: "",
    suburb: "",
    latitude: null,
    longitude: null,
  });
  const [searchQuery, setSearchQuery] = useState<{ [key: string]: any }>();
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [business, setBusiness] = useState<any[]>([]);
  const { data: servicesData } = useGetServicesesQuery([
    { name: "name", value: search },
  ]);

  const [focus, setFocus] = useState<TUniObject>({ postalCode: false });
  // const [addressData, setAddressDaaddressData] = useState<TUniObject>([]);
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
  // console.log(addressData);

  function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchQuery?.serviceId || !allAddress.postalCode) {
      return setSearchQuery((c) => ({
        ...c,
        message: "Select service name and postcode from dropdown!",
      }));
    }
    fetch(
      `${apiUrl}businesses?serviceId=${searchQuery?.serviceId}&longitude=${allAddress?.longitude}&latitude=${allAddress.latitude}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.ok);
        if (data.ok) {
          setBusiness(data.data);
          // setPage(data.pagination.nextPage);
          // setIsLoading(false);
        } else {
          // setIsError(true);
          // setIsLoading(false);
        }
      })
      .catch((e) => {
        // setIsError(true);
        // setIsLoading(false);
        // console.log(e);
      });
  }

  return (
    <div className="px-2 lg:px-36 py-4 lg:py-8 min-h-screen ">
      <h4 className="text-xl">Search Businesses for refer</h4>
      <div>
        <form
          className="flex flex-col lg:flex-row my-2 font-Montserrat items-center gap-1 mx-auto"
          onSubmit={handelSubmit}
        >
          <div className="flex flex-col lg:flex-row items-center text-black-500">
            <div className="relative mb-1 lg:mb-0">
              <input
                type="text"
                name="search"
                value={search}
                required
                autoComplete="off"
                // onFocus={() => setSearchActive(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setSearchActive(false);
                  }, 300)
                }
                onChange={(e) => {
                  setSearchActive(true);
                  setSearch(e.target.value);
                  setSearchQuery((c) => ({
                    ...c,
                    serviceId: "",
                    message: "",
                  }));
                }}
                className="w-[208px] lg:w-[391px] h-12 focus:outline-none p-3 rounded border-[#343333] border border-r-0 font-medium"
                placeholder="What services are you looking for"
              />
              {searchActive && (
                <ul className="absolute bg-white shadow-md w-full text-lg rounded-b-lg max-h-60 overflow-y-auto z-10">
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
            <div className="relative">
              <div className="relative">
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
                  onFocus={() => setFocus((c) => ({ ...c, postalCode: true }))}
                  onChange={(e) => {
                    if (
                      (e.target.value &&
                        e.target.value.length <
                          searchQuery?.postalCode?.length) ||
                      0
                    ) {
                      setAllAddress((c) => ({ ...c, postalCode: "" }));
                      setSearchQuery((c) => ({
                        ...c,
                        postalCode: e.target.value,
                      }));
                      return;
                    }
                    if (e.target.value && isNaN(Number(e.target.value))) return;

                    if (e.target.value.length > 4) return;

                    setAllAddress((c) => ({ ...c, postalCode: "" }));
                    setSearchQuery((c) => ({
                      ...c,
                      postalCode: e.target.value,
                    }));
                  }}
                  value={searchQuery?.postalCode || ""}
                  required
                  className="w-[208px] h-12 pl-8 pr-2 rounded border-[#343333] border focus:outline-none font-medium truncate"
                />
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute ml-2 top-3.5"
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
                        setAllAddress((c) => ({
                          ...c,
                          postalCode: address.postcode,
                          suburb: address.name,
                          latitude: address.latitude,
                          longitude: address.longitude,
                        }));
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
          <button className="flex items-center gap-2 rounded-[3px] h-12 py-2 px-5 bg-mastard-500 text-green-500 font-semibold text-lg">
            Search{" "}
          </button>
        </form>
        {searchQuery?.message && (
          <small className="text-red-500 text-sm block w-full -mt-1.5 text-left">
            {searchQuery?.message}
          </small>
        )}
      </div>
      {business.length > 0 ? (
        <div className="mt-8">
          <h5 className="text-lg lg:text-2xl mb-5">
            Search result for <span className="font-medium">{search}</span> in{" "}
            <span className="font-medium">{allAddress.suburb}</span>.
          </h5>
          {business.map((singleBusines, indx) => (
            <BusinessCart key={indx} data={singleBusines} refer/>
          ))}
        </div>
      ) : (
        <h2 className="text-2xl font-medium text-center mt-8">No services found</h2>
      )}
    </div>
  );
}
