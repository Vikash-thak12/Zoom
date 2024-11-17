'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <section className='sticky top-0 left-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white'>
            <div className='flex flex-1 flex-col gap-6'>
                {sidebarLinks.map((link) => {
                    const isActive = pathname == link.route || pathname.startsWith(`${link.route}/`)
                    return (
                        <Link href={link.route} key={link.route} className={cn("flex gap-5 items-center p-3 rounded-lg", {"bg-blue-1": isActive})}>
                            <Image src={link.imgURL} alt={link.label} height={28} width={28} />
                            <p className='hidden md:block text-lg font-semibold'>{link.label}</p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default Sidebar
