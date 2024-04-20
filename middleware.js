import { message } from "antd";
import { NextResponse } from "next/server";
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/login",
    "/signup",
    "/manager/dashboard",
  ],
};
// Define your array of protected routes
const playerProtectedRoutes = ["manager", "admin", "login", "signup"];
const managerProtectedRoutes = ["admin", "login", "signup"];
const adminProtectedRoutes = ["login", "signup"];

// Function to check if the URL includes any item from the protectedRoutes array
const isProtectedRoute = (currentURL, routeList) => {
  for (const route of routeList) {
    if (currentURL.includes(route)) {
      return true;
    }
  }
  return false;
};

export default async function middleware(req) {
  const cookie = req.cookies.get("access_token");
  const user_role = req.cookies.get("user-role");
  const url = req.url;

  if (user_role?.value === "player") {
    let isProtected = isProtectedRoute(url, playerProtectedRoutes);
    if (!cookie || isProtected) {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL);
    }
  }
  if (user_role?.value === "manager") {
    let isProtected = isProtectedRoute(url, managerProtectedRoutes);
    if (!cookie || isProtected) {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL);
    }
  }
  if (user_role?.value === "admin") {
    let isProtected = isProtectedRoute(url, adminProtectedRoutes);
    if (!cookie || isProtected) {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL);
    }
  }
}
