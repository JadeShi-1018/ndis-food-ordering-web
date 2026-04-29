"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { token, email, setAuth } = useAuth();

  const isLoggedIn = !!token;
  const displayName = email ? email.split("@")[0] : "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");

    setAuth(null, null);
    router.push("/");
  };
  const navItemClass =
  "font-medium text-lg border-b-2 border-transparent pb-1 hover:border-[var(--color-main)] transition-all duration-200 cursor-pointer";

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-40">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="NDIS Service System"
                width={117}
                height={60}
              />
            </Link>
          </div>

          

<div className="hidden md:flex items-center space-x-10">
  <Link href="/select-service">
    <span className={navItemClass} style={{ color: "var(--color-main)" }}>
      Find Services
    </span>
  </Link>

  {isLoggedIn && (
    <Link href="/my-orders">
      <span className={navItemClass} style={{ color: "var(--color-main)" }}>
        My Orders
      </span>
    </Link>
  )}

  <Link href="/technical-overview">
    <span className={navItemClass} style={{ color: "var(--color-main)" }}>
      Technical Overview
    </span>
  </Link>
</div>

          <div className="flex items-center space-x-4 flex-shrink-0">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => router.push("/user-login")}
                  className="border-2 rounded-full font-medium text-xl h-[50px] px-6 transition-all duration-200"
                  style={{
                    color: "var(--color-main)",
                    borderColor: "var(--color-main)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-main)";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--color-main)";
                  }}
                >
                  Login
                </button>

                <button
                  onClick={() => router.push("/user-signup")}
                  className="border-2 rounded-full font-medium text-xl h-[50px] px-6 transition-all duration-200"
                  style={{
                    color: "var(--color-main)",
                    borderColor: "var(--color-main)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-main)";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--color-main)";
                  }}
                >
                  Register
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
               

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-main)" }}
                  >
                    <span className="text-sm font-medium text-white">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span
                    className="font-medium text-sm"
                    style={{ color: "var(--color-main)" }}
                  >
                    {displayName}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="border-2 rounded-full font-medium text-sm h-[40px] px-4 transition-all duration-200"
                  style={{
                    color: "var(--color-main)",
                    borderColor: "var(--color-main)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-main)";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--color-main)";
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}