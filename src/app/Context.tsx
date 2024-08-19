"use client";
import { createContext, useState, useEffect } from "react";
// import { getSession } from "@/actions/auth";
import Cookies from "js-cookie";
type TokenData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  image: null | string;
  isVerified: boolean;
  mobile: null | string;
  Businesses: null | object;
};

type ContextProps = {
  userData: TokenData | undefined;
  setUserData: React.Dispatch<React.SetStateAction<TokenData | undefined>>;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export const context = createContext<ContextProps | null>(null);

export function Context({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<TokenData>();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetch(apiUrl + "auth/session", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
            setUserData(res.data);
          }
        });
    }
  }, []);

  return (
    <context.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </context.Provider>
  );
}
