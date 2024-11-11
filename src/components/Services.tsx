"use client";
import React, { useEffect, useState } from "react";
import ServiceCart from "./ServiceCart";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Services() {
  const [services, setServices] = useState<
    { id: string; name: string; image: string; description: string }[]
  >([]);
  const [active, setActive] = useState<string>("All");
  const [page, setPage] = useState<null | number>(1);
  const [open, setOpen] = useState<boolean>(false);

  const characters = [
    "All",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  useEffect(() => {
    try {
      fetch(
        apiUrl +
          `services?page=1&limit=15&` +
          (active !== "All" && active
            ? `name=${active.toLocaleLowerCase()}`
            : "")
      )
        .then((res) => res.json())
        .then((json) => {
          if (json.ok) {
            setServices(json.data);
            setPage(json.pagination?.nextPage);
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }, [active]);

  function loadMore() {
    fetch(
      apiUrl +
        `services?page=${page}&limit=15&` +
        (active !== "All" && active ? `name=${active.toLocaleLowerCase()}` : "")
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          setServices([...services, ...json.data]);
          setPage(json.pagination?.nextPage);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <section className=" lg:px-[150px] lg:py-[30px] px-2 py-4">
      <h2 className="uppercase font-semibold text-5xl">Services</h2>
      <p className="font-Montserrat pt-4">Best Affordable services Provider</p>
      <div className="flex-wrap items-center gap-5 mt-5 hidden lg:flex">
        {characters.map((character, index) => (
          <button
            key={index}
            className={`rounded-full font-medium text-lg w-8 h-8 ${
              active === character
                ? "bg-green-500 text-white"
                : "text-green-500 bg-green-50 hover:bg-green-400 hover:text-white"
            }`}
            onClick={() => setActive(character)}
          >
            {character}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 p-3 rounded-xl border ml-auto w-24 h-9 relative lg:hidden" onClick={()=>setOpen(!open)}>
        <span>{active}</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5 8C4.44772 8 4 7.55228 4 7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H5ZM7 13C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7ZM9 17C9 17.5523 9.44772 18 10 18H14C14.5523 18 15 17.5523 15 17C15 16.4477 14.5523 16 14 16H10C9.44772 16 9 16.4477 9 17Z"
            fill="#58AB7F"
          />
          <mask
            id="mask0_742_1974"
            maskUnits="userSpaceOnUse"
            x="4"
            y="6"
            width="16"
            height="12"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5 8C4.44772 8 4 7.55228 4 7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H5ZM7 13C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7ZM9 17C9 17.5523 9.44772 18 10 18H14C14.5523 18 15 17.5523 15 17C15 16.4477 14.5523 16 14 16H10C9.44772 16 9 16.4477 9 17Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_742_1974)"></g>
        </svg>
        <div
          className={`grid grid-cols-2 w-full absolute top-8 left-0 gap-3 bg-white overflow-y-auto ${open?"h-[300px] p-4 border":"h-[0px] p-0"} transition-all duration-300 ease-in-out`}
        >
          {characters.map((character, index) => (
            <button
              key={index}
              className={`rounded-full font-medium text-xs w-6 h-6 mx-auto ${
                active === character
                  ? "bg-green-500 text-white"
                  : "text-green-500 bg-green-50 hover:bg-green-400 hover:text-white"
              }`}
              onClick={() => setActive(character)}
            >
              {character}
            </button>
          ))}
        </div>
      </div>

      {services?.length === 0 && (
        <p className="text-center w-full py-8">No services found</p>
      )}
      <div className="my-8 grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 justify-between">
        {services.map((service) => (
          <ServiceCart
            key={service.id}
            id={service.id}
            name={service.name}
            image={apiUrl + service.image}
            description={service.description}
          />
        ))}
      </div>
      {page && (
        <button
          onClick={loadMore}
          className="flex items-center gap-2 rounded-t-[3px] border-[.5px] border-b-2 py-3 px-5 border-white bg-green-600 active:bg-green-700 text-white  ml-auto"
        >
          See more{" "}
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
      )}
    </section>
  );
}
