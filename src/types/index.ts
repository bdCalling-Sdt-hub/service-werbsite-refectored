import { IconType } from "react-icons";

type User = {
  firstName: string;
  lastName?: string;
  image: string | null;
  email?: string;
  mobile?: string;
};

type Service = {
  name: string;
};

export type TBit = {
  id?: string;
  userId: string;
  serviceId?: string;
  description: string;
  image?: string;
  latitude: number;
  longitude: number;
  communicationPreference: "call" | "email"; // Add other preferences if applicable
  createdAt: string;
  updatedAt?: string;
  user: User;
  service: Service;
};

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

export type TUniObject = { [key: string]: any };

export type TGPlaceAddress = {
  address: string;
  postalCode: string;
  state: string;
  suburb: string;
  longitude?: number | null;
  latitude?: number | null;
};
