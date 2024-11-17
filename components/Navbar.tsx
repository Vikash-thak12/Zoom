import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href={"/"} className='flex items-center gap-2'>
        <Image src={"/icons/logo.svg"} height={24} width={24} alt='Main logo' className='size-14 max-sm:size-10' />
        <p className='text-white font-bold'>Zoom</p>
      </Link>

      <div className='flex gap-2'>
        <SignedOut>
          <SignInButton />
        </SignedOut>


        <SignedIn>
          <UserButton />
        </SignedIn>

      <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
