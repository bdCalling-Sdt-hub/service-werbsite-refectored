import { NextResponse } from "next/server";
import { authRoutes } from "./utils/authRoutes";

export default function middleware(req: any) {
  const { nextUrl } = req;

  //   const isLoggedIn = req.cookies.get("graphic-access-token")?.value;
  const isLoggedIn = req.cookies.get("token")?.value as string;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // console.log({arguments, isAuthRoute, isLoggedIn });
  // If user exists redirect to `/home`
  if (isAuthRoute && isLoggedIn) {
    const data = isLoggedIn.split(".");

    if (data.length !== 3) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    let payload;

    try {
      payload = JSON.parse(atob(data[1]));
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (payload.type === "CUSTOMER" && nextUrl.pathname.includes("dashboard")) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }

    return NextResponse.redirect(new URL("/", req.url));
  }

  // // If user not found, redirect to `/login`
  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:paths*", "/jobs", "/add-bit-wallet"],
};
