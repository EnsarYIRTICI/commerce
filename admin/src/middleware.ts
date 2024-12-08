import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authUser } from "./lib/services/auth.service";
import { errorMessages } from "./lib/constants/errorMessages";

import {
  cookie,
  isAuthUrl,
  next,
  redirectHome,
  redirectLogin,
} from "./lib/utils/middlewareUtils";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token");

    const pathname = request.nextUrl.pathname;
    request.headers.set("x-url", pathname);

    if (!token && !isAuthUrl(request)) {
      return redirectLogin(request);
    }

    if (token) {
      try {
        const userData = await authUser(token.value);

        let response;

        if (isAuthUrl(request)) {
          response = redirectHome(request);
        } else {
          response = next(request);
        }

        return cookie(response, token.value);
      } catch (error) {
        console.error(error);

        if (!isAuthUrl(request)) {
          return redirectLogin(request);
        }
      }
    }

    return next(request);
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
