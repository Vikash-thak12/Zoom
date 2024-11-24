import CallList from '@/components/CallList'
import React from 'react'

const UpcomingPage = () => {
  return (
    <div className='text-white flex size-full flex-col gap-12'>
      <h1 className='font-bold text-3xl'>Upcoming page</h1>
      <CallList type="upcoming" />
    </div>
  )
}

export default UpcomingPage
