'use client'

import Image from 'next/image'
import { useState } from 'react'

import Link from "next/link";
import { User } from '../types/models';

interface NavbarProps {
  user?: import("../types/models").User;
  onLogin?: () => void;
}

export default function Navbar({ 
    user, 
    onLogin, 
}: NavbarProps) {
    
   const defaultUser: User = {
        name: "Mary Chen",
        avatar: "/avatar.png",
        hasNewNotification: true,
        hasNewOrders: false
    }

    // If no user is passed from parent, use internal state for testing
    const [internalIsLoggedIn, setInternalIsLoggedIn] = useState<boolean>(false)
    
    // If external user is passed, use external state; otherwise use internal logic
    const isLoggedIn = user !== undefined ? !!user : internalIsLoggedIn
    const currentUser = user || (internalIsLoggedIn ? defaultUser : undefined)
    
    // Internal toggle function (for testing purposes)
    const toggleInternalLogin = () => {
        setInternalIsLoggedIn(!internalIsLoggedIn)
    }


  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-40">
          {/* Logo */}
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

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-16">
                        <Link href="/selectService">
                            <span
                            className="font-medium text-lg border-b-2 border-transparent pb-1
                                        hover:border-[var(--color-main)] transition-all duration-200"
                            style={{ color: 'var(--color-main)' }}
                            >
                            尋找服務
                            </span>
                        </Link>

            {!isLoggedIn && (
              <a
                href="#"
                className="font-medium text-lg border-b-2 border-transparent pb-1
                                          hover:border-[var(--color-main)] transition-all duration-200"
                style={{ color: "var(--color-main)" }}
              >
                成為Provider
              </a>
            )}

            <a
              href="#"
              className="font-medium text-lg border-b-2 border-transparent pb-1
                                      hover:border-[var(--color-main)] transition-all duration-200"
              style={{ color: "var(--color-main)" }}
            >
              聯絡我們
            </a>
          </div>

          {/* Right Section */}
          <div className="lex items-center space-x-4 flex-shrink-0">
            {!isLoggedIn ? (
              <>
                {/* Login Button */}
                <button
                  onClick={onLogin || toggleInternalLogin}
                  className="border-2 rounded-full font-medium text-xl h-[50px] px-6
                                                hover:text-white transition-all duration-200"
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
                  登入
                </button>

                {/* Register Button */}
                <button
                  onClick={onLogin || toggleInternalLogin}
                  className="border-2 rounded-full font-medium text-xl h-[50px] px-6
                                                hover:text-white transition-all duration-200"
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
                  註冊
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Notification Bell */}
                <div className="relative">
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

                  {/* Notification Badge - Red dot indicator */}
                  {currentUser?.hasNewNotification && (
                    <span
                      className="absolute rounded-full border-2 border-white"
                      style={{
                        backgroundColor: "#ef4444",
                        top: "6px",
                        right: "6px",
                        width: "14px",
                        height: "14px",
                      }}
                    ></span>
                  )}
                </div>

                {/* Order Icon */}
                <div className="relative">
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

                  {/* Order Badge - Red dot indicator */}
                  {currentUser?.hasNewOrders && (
                    <span
                      className="absolute rounded-full border-2 border-white"
                      style={{
                        backgroundColor: "#ef4444",
                        top: "6px",
                        right: "6px",
                        width: "14px",
                        height: "14px",
                      }}
                    ></span>
                  )}
                </div>

                {/* User Info */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  {/* User Avatar */}
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-map1)" }}
                  >
                    {currentUser?.avatar ? (
                      <Image
                        src={currentUser?.avatar}
                        alt={currentUser?.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="text-sm font-medium text-white">
                        {currentUser?.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* User Name */}
                  <span
                    className="font-medium text-sm"
                    style={{ color: "var(--color-main)" }}
                  >
                    {currentUser?.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
