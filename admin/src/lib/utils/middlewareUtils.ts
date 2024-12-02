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

const cookie = (response: NextResponse, user: IUser, token: string) => {
  const maxAge = 60 * 60 * 24 * 7;

  response.cookies.set("user", JSON.stringify(user), {
    httpOnly: false,
    maxAge,
  });

  response.cookies.set("token", token, {
    httpOnly: false,
    maxAge,
  });

  return response;
};

export { isAuthUrl, redirectHome, redirectLogin, next, cookie };
