import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";


import GlobalFooter from "@/components/GlobalFooter";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NDIS Service Platform",
  description: "NDIS food ordering and service booking platform",
  icons: {
    icon: "/favicon-v2.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <Navbar />

        {/*globally support toasts */}
        <ToastContainer />

        <main className="flex-grow">{children}</main>
        <GlobalFooter />
        </AuthProvider>
      </body>
    </html>
  );





}
