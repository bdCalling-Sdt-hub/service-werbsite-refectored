import React from "react";
import Image from "next/image";

export default function ReviewCart({
  businessName,
  review,
  image,
  name,
  address,
  date,
}: {
  businessName: string;
  review: string;
  image: string;
  name: string;
  address: string;
  date: string;
}) {
  return (
    <div className="bg-green-50 rounded-lg py-11 px-20 flex flex-col items-center text-center border-[.8px] border-green-500 text-black-500 hover:bg-green-500 hover:text-white transition-all duration-500">
      <h5 className="font-medium text-2xl">{businessName}</h5>
      <p className="my-2">{review}</p>
      <Image
        src={image}
        alt={name}
        width={180}
        height={180}
        className="rounded-full w-[180px] h-[180px]"
      />
      <p className="mt-2 mb-1 font-medium">{name}</p>
      <p className="text-xs">{address}</p>
      <span>{date}</span>
    </div>
  );
}
