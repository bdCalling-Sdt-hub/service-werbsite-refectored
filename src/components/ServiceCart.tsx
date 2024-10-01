import React from "react";
import Image from "next/image";
import { Tooltip } from "react-tooltip";

export default function ServiceCart({
  id,
  name,
  image,
  description,
}: {
  id: string;
  name: string;
  image: string;
  description: string;
}) {
  return (
    <div
      data-tooltip-id={id}
      data-tooltip-content={description}
      className="p-5 bg-cover bg-serviceCartBG bg-bottom aspect-[1.23/1] relative"
    >
      <Tooltip id={id} />
      <Image
        className="rounded-lg h-[85%] transition-all duration-500 w-full"
        src={image}
        alt={name}
        width={343}
        height={225}
        priority
      />
      <h3 className="text-black-400 text-sm mt-2">{name}</h3>
    </div>
  );
}
