import { IconType } from "react-icons";

export type TSideItem = {
  name: string;
  icon: IconType;
  path: string;
  childrens?: {
    subName: string;
    subIcon: IconType;
    subPath: string;
  }[];
};

export type TUniObject = { [key: string]: string };

export type TGPlaceAddress = {
  address: string;
  postalCode: string;
  state: string;
  suburb: string;
  longitude?: number | null;
  latitude?: number | null;
} ;
