import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authUser } from "./lib/services/auth.service";
import { errorMessages } from "./lib/constants/errorMessages";

import {
  MiddlewareAdminService,
  MiddlewareCustomerService,
} from "./lib/utils/middlewareUtils";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token");
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith("/admin")) {
      const { isAuthUrl, toHomeRes, toLoginRes, nextRes, xUser, xUrl } =
        new MiddlewareAdminService(request);

      if (token) {
        const userData = await authUser(token.value);

        if (!userData) {
          throw new Error("User not found");
        }

        let response;

        if (isAuthUrl()) {
          response = toHomeRes();
        } else {
          response = nextRes();
        }

        response = xUrl(response);
        response = xUser(response, userData);

        return response;
      }

      if (isAuthUrl()) {
        return nextRes();
      }

      return toLoginRes();
    } else {
      const { isAuthUrl, toHomeRes, toLoginRes, nextRes, xUrl, xUser } =
        new MiddlewareCustomerService(request);

      if (token) {
        const userData = await authUser(token.value);

        if (!userData) {
          throw new Error("User not found");
        }

        let response;

        if (isAuthUrl()) {
          response = toHomeRes();
        } else {
          response = nextRes();
        }

        response = xUrl(response);
        response = xUser(response, userData);

        return response;
      }

      return nextRes();
    }
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
