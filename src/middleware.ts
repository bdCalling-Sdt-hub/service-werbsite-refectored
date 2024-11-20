import { NextResponse } from "next/server";
import { authRoutes } from "./utils/authRoutes";

export default function middleware(req: any) {
  const { nextUrl } = req;

  //   const isLoggedIn = req.cookies.get("graphic-access-token")?.value;
  const isLoggedIn = req.cookies.get("token")?.value;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // If user exists redirect to `/home`
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // // If user not found, redirect to `/login`
  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:paths*", "/jobs", "/add-bit-wallet"],
};
