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
      <h2 className="uppercase font-semibold text-3xl lg:text-5xl">Services</h2>
      <p className="font-Montserrat pt-4">Best Affordable services Provider</p>
      <div className="flex-wrap items-center gap-2 lg:gap-5 mt-5 flex">
        {characters.map((character, index) => (
          <button
            key={index}
            className={`rounded-full font-medium text-xs w-6 h-6 lg:text-lg lg:w-8 lg:h-8 ${
              active === character  
                ? "bg-mastard-500 text-green-500"
                : "text-green-500 bg-mastard-50 hover:bg-green-400 hover:text-white"
            }`}
            onClick={() => setActive(character)}
          >
            {character}
          </button>
        ))}
      </div>

      {services?.length === 0 && (
        <p className="text-center w-full py-8">No services found</p>
      )}
      <div className="my-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7 gap-3 md:gap-4 justify-between">
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
          className="flex items-center gap-2 rounded-t-[3px] border-[.5px] border-b-2 py-3 px-5 border-white bg-mastard-500 active:bg-mastard-600 text-green-500  ml-auto"
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
