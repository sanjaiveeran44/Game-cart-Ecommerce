"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import {
  FiShoppingCart,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";
import { assets } from "@/assets/assets";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* LEFT SIDE */}
          <div className="flex items-center space-x-8">
            <div
              className="cursor-pointer"
              onClick={() => router.push("/")}
            >
              <Image
                src={assets.new_logo}
                alt="GameCart Logo"
                width={144}
                height={40}
                className="w-28 md:w-36 h-auto"
                priority
              />
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {["Home", "Shop", "Orders", "About"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="relative rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-50/50 hover:text-indigo-600
                             after:absolute after:bottom-1.5 after:left-1/2 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all
                             hover:after:left-1/4 hover:after:w-2/4"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-slate-700 transition-colors hover:text-slate-900"
            >
              <FiShoppingCart className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">
                0
              </span>
            </Link>

            {/* AUTH (DESKTOP) */}
            <div className="hidden md:flex items-center gap-2">

              <SignedOut>
                <Link
                  href="/sign-in"
                  className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <FiLogIn className="h-4 w-4" />
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className="flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                >
                  <FiUserPlus className="h-4 w-4" />
                  Sign Up
                </Link>
              </SignedOut>

              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8",
                      userButtonPopoverCard:
                        "shadow-lg rounded-xl",
                    },
                  }}
                />
              </SignedIn>

            </div>
            <button className="md:hidden p-2 text-slate-700 hover:text-slate-900">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}
