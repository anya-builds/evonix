import Image from 'next/image'
import React from 'react'
import Link from "next/link";
import { SignInButton, useAuth,SignUpButton, UserButton,SignedOut,SignedIn, useUser } from "@clerk/nextjs";
const Header = () => {
  return (
    <>
    <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
            <Image
              src="/spott.png"
              alt="Spott logo"
              width={500}
              height={500}
              className="w-full h-11"
              priority
            />
            </Link>

            {/* Search and location for logo */}

            {/* Right side Action */}
          
          <div className="flex items-center">
              <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
            
        </div>

        {/* Mobile search and location - below header */}
    </nav>
    {/* Modal */}
    </>
  )
}

export default Header
