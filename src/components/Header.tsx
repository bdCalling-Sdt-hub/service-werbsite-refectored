"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Header() {
  const [search, setSearch] = useState("");
  const [business, setBusiness] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [searchActive, setSearchActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (search.length > 0) {
      fetch(apiUrl + "businesses?name=" + search)
        .then((res) => res.json())
        .then((res) => {
          setBusiness(res.data);
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
      fetch(apiUrl + "services?name=" + search)
        .then((res) => res.json())
        .then((res) => {
          setServices(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setBusiness([]);
      setServices([]);
    }
  }, [search]);

  const [postcode, setPostcode] = useState("");
  const [suburbFocus, setSuburbFocus] = useState(false);
  const [suburbs, setSuburbs] = useState<any>([]);

  useEffect(() => {
    // searchSuburbAction(postcode).then((res) => {
    //   if (res.data) {
    //     setSuburbs(res.data);
    //   }
    // });
  }, [postcode]);

  function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (search.length === 0 || !postcode) return;
    router.push(`/search?search=${search}&postcode=${postcode}`);
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
                  onChange={(e) => setSearch(e.target.value)}
                  className="lg:w-[391px] h-12 focus:outline-none p-3 rounded border-[#343333] border border-r-0 font-medium"
                  placeholder="What services are you looking for"
                />
                {searchActive && (
                  <ul className="absolute bg-white w-full text-lg rounded-b-lg max-h-60 overflow-y-scroll">
                    {business.map((business: any, index) => (
                      <li
                        key={index}
                        onClick={() => router.push("/business/" + business.id)}
                        // onClick={() => setSearch(business.businessName)}
                        className="text-black-500 py-2 hover:bg-slate-100 cursor-pointer flex gap-2 px-4"
                      >
                        <Image
                          src={business.image}
                          alt={business.names}
                          width={56}
                          height={56}
                          className="rounded-full"
                        />
                        <div className="text-start">
                          <p className="text-lg font-medium">
                            {business.name}
                          </p>
                          <span className="text-sm">{business.address}</span>
                        </div>
                      </li>
                    ))}
                    {services.length > 0 && (
                      <li className="text-white py-2 bg-black">Services</li>
                    )}
                    {services.map((service: any, index) => (
                      <li
                        key={index}
                        className="py-2 hover:bg-slate-100 cursor-pointer"
                        onClick={() => setSearch(service.name)}
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
                  onChange={(e) => setPostcode(e.target.value)}
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
                  <ul className="w-full absolute bg-slate-200 rounded-b-md top-12">
                    {suburbs.map((suburb: any, index: any) => (
                      <li
                        key={index}
                        className="hover:bg-slate-300 p-2 cursor-pointer"
                        onClick={() => {
                          setPostcode(suburb.name + ", " + suburb.postcode);
                          setSuburbFocus(false);
                        }}
                      >
                        {suburb.name + ", " + suburb.postcode}
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
        </div>
      </div>
    </header>
  );
}
