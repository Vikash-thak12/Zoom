import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex-between fixed z-50 w-full bg-gray-700 px-6 py-4 lg:px-10'>
      <Link href={"/"} className='flex items-center gap-2'>
        <Image src={"/icons/logo.svg"} height={32} width={32} alt='Main logo' className='size-14 max-sm:size-10' />
        <p className='text-white font-bold'>Zoom</p>
      </Link>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>


        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      <MobileNav />
    </nav>
  )
}

export default Navbar
