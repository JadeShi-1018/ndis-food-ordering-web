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

          <div className="hidden md:flex items-center space-x-16">
            <Link href="/select-service">
              <span
                className="font-medium text-lg border-b-2 border-transparent pb-1 hover:border-[var(--color-main)] transition-all duration-200"
                style={{ color: "var(--color-main)" }}
              >
                Find Services
              </span>
            </Link>

            {!isLoggedIn && (
              <a
                href="#"
                className="font-medium text-lg border-b-2 border-transparent pb-1 hover:border-[var(--color-main)] transition-all duration-200"
                style={{ color: "var(--color-main)" }}
              >
                Become a Provider
              </a>
            )}

            <a
              href="#"
              className="font-medium text-lg border-b-2 border-transparent pb-1 hover:border-[var(--color-main)] transition-all duration-200"
              style={{ color: "var(--color-main)" }}
            >
              Contact Us
            </a>
          </div>

          <div className="flex items-center space-x-4 flex-shrink-0">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => router.push("/user-login")}
                  className="border-2 rounded-full font-medium text-xl h-[50px] px-6 hover:text-white transition-all duration-200"
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
                  className="border-2 rounded-full font-medium text-xl h-[50px] px-6 hover:text-white transition-all duration-200"
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
                <button
                  className="p-2 transition-colors duration-200 hover:opacity-80"
                  style={{ color: "var(--color-main)" }}
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>

                <button
                  className="p-2 transition-colors duration-200 hover:opacity-80"
                  style={{ color: "var(--color-main)" }}
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="5"
                      y="4"
                      width="14"
                      height="17"
                      rx="2"
                      ry="2"
                      strokeWidth={2}
                    />
                    <line x1="8" y1="9" x2="16" y2="9" strokeWidth={2} />
                    <line x1="8" y1="13" x2="16" y2="13" strokeWidth={2} />
                    <line x1="8" y1="17" x2="14" y2="17" strokeWidth={2} />
                  </svg>
                </button>

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