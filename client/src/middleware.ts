import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authUser } from "./lib/services/auth.service";
import { errorMessages } from "./lib/constants/errorMessages";

import {
  isAuthUrl,
  next,
  redirectHome,
  redirectLogin,
} from "./lib/utils/middlewareUtils";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token");

    if (token) {
      const userData = await authUser(token.value);

      if (!userData) {
        throw new Error("User not found");
      }

      let response;

      if (isAuthUrl(request)) {
        response = redirectHome(request);
      } else {
        response = next(request);
      }

      response.headers.set("x-url", request.nextUrl.pathname);
      response.headers.set("x-user", JSON.stringify(userData));

      return response;
    }

    if (isAuthUrl(request)) {
      return next(request);
    }

    return redirectLogin(request);
  } catch (error) {
    console.error(error);

    return NextResponse.json(errorMessages.INTERNAL_SERVER_ERROR);
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
