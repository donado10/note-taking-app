import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Add a new header x-current-path which passes the path to downstream components

  if (request.headers.get("accept") == "text/x-component")
    return NextResponse.next();

  const headers = new Headers(request.headers);
  console.log(request.nextUrl);
  headers.set("x-current-path", request.nextUrl.pathname);
  headers.set("x-search-query", request.nextUrl.search);
  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
  missing: [
    { type: "header", key: "next-router-prefetch" },
    { type: "header", key: "next-action" },
    { type: "header", key: "purpose", value: "prefetch" },
  ],
};
