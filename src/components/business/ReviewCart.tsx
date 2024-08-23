import React from "react";
import generateStars from "./generateStar";

export default function ReviewCart({
  review,
  rating,
  date,
  location,
  name,
}: {
  review: string;
  rating: number;
  date: string;
  location: string;
  name: string;
}) {
  return (
    <div className="rounded-xl serviceShadow p-6">
        <div className="flex items-center gap-1">
          {generateStars(rating).map((star, index) => (
            <span key={index}>{star}</span>
          ))}
        </div>
      <div className="flex items-center justify-between my-4">
        <h5 className="lg:text-2xl font-medium">{name}</h5>
        <p className="lg:text-lg text-sm">{date}</p>
      </div>
      <p className="text-black-400">
        {review}
        {/* <span className="font-medium underline">See less</span> */}
      </p>
      <p className="font-medium mt-5">{location}</p>
    </div>
  );
}
