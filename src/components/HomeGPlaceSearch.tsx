"use client";

import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { TGPlaceAddress } from "@/types";
const libraries: "places"[] = ["places"];

const HomeGPlaceSearch = ({
  allAddress,
  setAllAddress,
}: {
  allAddress: TGPlaceAddress;
  setAllAddress: Dispatch<SetStateAction<TGPlaceAddress>>;
}) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();

    let postalCode = "";
    let state = "";
    let suburb = "";
    let lat = null;
    let lng = null;

    if (place?.address_components) {
      place.address_components.forEach((component) => {
        const componentType = component.types[0];
        switch (componentType) {
          case "postal_code":
            postalCode = component.long_name;
            break;
          case "administrative_area_level_1":
            state = component.long_name;
            break;
          case "locality":
            suburb = component.long_name;
            break;
        }
      });
    }

    if (place.geometry?.location) {
      lat = place.geometry.location.lat();
      lng = place.geometry.location.lng();
    }

    setAllAddress({
      postalCode,
      state,
      suburb,
      address: place.formatted_address || "",
      latitude: lat,
      longitude: lng,
    });
  };

  return (
    <>
      <LoadScript
        googleMapsApiKey="AIzaSyDbkaRxITpzLhs_FzEMOuI0vuMSKzZ1Amk"
        libraries={libraries}
      >
        <Autocomplete
          onLoad={(autocomplete) => {
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={handlePlaceChanged}
          options={{
            componentRestrictions: { country: "au" }, // Restrict to Australia
          }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Post code"
              value={allAddress?.address}
              onChange={(e) =>
                setAllAddress((c) => ({ ...c, address: e.target.value }))
              }
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
        </Autocomplete>
      </LoadScript>
    </>
  );
};

export default HomeGPlaceSearch;
