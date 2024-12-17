import { NextRequest, NextResponse } from "next/server";
import { IUser } from "../types/IUser";

const isAuthUrl = (request: NextRequest) => {
  const authUrl = ["/login"];
  return authUrl.includes(request.nextUrl.pathname);
};

const redirectHome = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
};

const redirectLogin = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
};

const next = (request: NextRequest) => {
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
};

export { isAuthUrl, redirectHome, redirectLogin, next };
