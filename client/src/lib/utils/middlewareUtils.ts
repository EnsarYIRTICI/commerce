import { NextRequest, NextResponse } from "next/server";

class MiddlewareService {
  protected request: NextRequest;

  constructor(request: NextRequest) {
    this.request = request;
  }

  nextRes = () => {
    return NextResponse.next({
      request: {
        headers: this.request.headers,
      },
    });
  };

  xUser = (response: NextResponse, userData: any) => {
    response.headers.set("x-user", JSON.stringify(userData));
    return response;
  };

  xUrl = (response: NextResponse) => {
    response.headers.set("x-url", this.request.nextUrl.pathname);
    return response;
  };
}
class MiddlewareCustomerService extends MiddlewareService {
  private authUrl = ["/login", "/register"];

  constructor(request: NextRequest) {
    super(request);
  }

  isAuthUrl = () => {
    return this.authUrl.includes(this.request.nextUrl.pathname);
  };

  toHomeRes = () => {
    const url = this.request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  };

  toLoginRes = () => {
    const url = this.request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  };
}

class MiddlewareAdminService extends MiddlewareService {
  private authUrl = ["/admin/login"];

  constructor(request: NextRequest) {
    super(request);
  }

  isAuthUrl = () => {
    return this.authUrl.includes(this.request.nextUrl.pathname);
  };

  toHomeRes = () => {
    const url = this.request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  };

  toLoginRes = () => {
    const url = this.request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  };
}

export { MiddlewareAdminService, MiddlewareCustomerService };
