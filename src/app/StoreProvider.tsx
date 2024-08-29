"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AppStore, makeStore } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import Cookies from "js-cookie";
import { setUser } from "@/redux/features/users/authSlice";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const ChildComponent = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const router = useRouter();
    // const { user, isLoading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    useEffect(() => {
      const token = Cookies.get("token");
      if (token) {
        dispatch(setUser({ isLoading: true }));
        try {
          fetch(apiUrl + "auth/session", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.ok) {
                dispatch(setUser({ user: res.data, isLoading: false }));
              }
            })
            .catch((err) => {
              router.push("/");
              dispatch(setUser({ user: null, isLoading: false }));
            });
        } catch (error) {
          router.push("/");
          dispatch(setUser({ user: null, isLoading: false }));
        }
      } else {
        dispatch(setUser({ user: null, isLoading: false }));
      }
    }, []);
    // console.log(user);
    return <>{children}</>;
  };
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <ChildComponent>{children}</ChildComponent>
    </Provider>
  );
}
