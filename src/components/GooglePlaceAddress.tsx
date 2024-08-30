"use client";

import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { TGPlaceAddress } from "@/types";
const libraries: "places"[] = ["places"];

const GooglePlaceAddress = ({
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
    }
  };
  return (
    <>
      {/* <div className="w-full space-y-8"> */}
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
          <div className="w-full flex flex-col -mt-8">
            <label className="font-medium text-black-500">Street Address</label>
            <input
              type="text"
              placeholder="Enter business address"
              value={allAddress.address}
              onChange={(e) =>
                setAllAddress((c) => ({ ...c, address: e.target.value }))
              }
              required
              className="mt-2 p-3 w-full border border-black-500 rounded "
            />
          </div>
        </Autocomplete>
        <div className="w-full flex flex-col">
          <label className="font-medium text-black-500">Business Suburb</label>
          <input
            type="text"
            placeholder="Business suburb"
            value={allAddress.suburb}
            onChange={(e) =>
              setAllAddress((c) => ({ ...c, suburb: e.target.value }))
            }
            required
            className="mt-2 p-3 w-full border border-black-500 rounded"
          />
        </div>
        <div className="w-full flex flex-col">
          <label className="font-medium text-black-500">Postal Code</label>
          <input
            type="text"
            placeholder="Postal code"
            value={allAddress.postalCode}
            onChange={(e) =>
              setAllAddress((c) => ({ ...c, postalCode: e.target.value }))
            }
            required
            className="mt-2 p-3 w-full border border-black-500 rounded"
          />
        </div>
        <div className="w-full flex flex-col">
          <label className="font-medium text-black-500">Business State</label>
          <input
            type="text"
            placeholder="Business state"
            value={allAddress.state}
            onChange={(e) =>
              setAllAddress((c) => ({ ...c, state: e.target.value }))
            }
            required
            className="mt-2 p-3 w-full border border-black-500 rounded"
          />
        </div>
      </LoadScript>
    </>
  );
};

export default GooglePlaceAddress;
