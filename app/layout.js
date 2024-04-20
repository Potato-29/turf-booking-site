"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`h-screen ${inter.className}`}>
        <Navbar />
        <div className="pt-[70px] h-full">{children}</div>
      </body>
    </html>
  );
}
