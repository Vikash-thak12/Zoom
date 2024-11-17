import React, { ReactNode } from 'react'

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            Navbar
            <div className='flex'>
                Sidebar
                <section className=''>
                <div className='w-full'>
                    {children}
                </div>
                </section>
            </div>
        </main>
    )
}

export default HomeLayout
