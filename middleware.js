import { NextResponse } from "next/server";
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|).*)",
    // "/login",
    "/signup",
    "/manager/dashboard",
    "/admin/dashboard",
    "/profile",
  ],
};
// Define your array of protected routes
const playerProtectedRoutes = [
  "manager",
  "admin",
  "login",
  "signup",
  "profile",
];
const managerProtectedRoutes = ["admin", "login", "signup", "profile"];
const adminProtectedRoutes = ["manager", "login", "signup", "profile"];

// Function to check if the URL includes any item from the protectedRoutes array
const isProtectedRoute = (currentURL, routeList) => {
  for (const route of routeList) {
    if (currentURL.includes(route)) {
      return true;
    }
  }
  return false;
};

export default async function middleware(req, res, next) {
  const cookie = req.cookies.get("access_token");
  const user_role = req.cookies.get("user-role");
  const url = req.url;

  if (!cookie) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + "/login");
  }

  if (user_role?.value === "player") {
    let isProtected = isProtectedRoute(url, playerProtectedRoutes);
    if (!cookie || isProtected) {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL);
    }
  }
  if (user_role?.value === "manager") {
    let isProtected = isProtectedRoute(url, managerProtectedRoutes);
    if (!cookie || isProtected) {
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_BASE_URL + "/manager/dashboard"
      );
    }
  }
  if (user_role?.value === "admin") {
    let isProtected = isProtectedRoute(url, adminProtectedRoutes);
    if (!cookie || isProtected) {
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_BASE_URL + "/admin/dashboard"
      );
    }
  }
}
