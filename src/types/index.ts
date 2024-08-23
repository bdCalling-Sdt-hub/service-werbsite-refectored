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
