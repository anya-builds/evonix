import Image from 'next/image'
import React from 'react'
import Link from "next/link";
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
        </div>

        {/* Mobile search and location - below header */}
    </nav>
    {/* Modal */}
    </>
  )
}

export default Header
