"use client";
// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { usePathname } from "next/navigation";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route
  const hideNavbarRoutes = ["/sign-up", "/sign-in"]; // List of routes where the Navbar should be hiddens
  return (
    <ClerkProvider>
      <Provider store={store}>
        <html lang="en">
          <body
            className={`${geistSans.variable} overflow-x-hidden ${geistMono.variable} antialiased bg-[#F3F4F7]`}
          >
            {" "}
            {!hideNavbarRoutes.includes(pathname) && <Header />}
            <div className=" ">{children}</div>
            {!hideNavbarRoutes.includes(pathname) && <Footer />}
          </body>
        </html>
      </Provider>
    </ClerkProvider>
  );
}
