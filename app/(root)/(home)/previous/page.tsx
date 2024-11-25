import CallList from '@/components/CallList'
import React from 'react'

const PreviousPage = () => {
  return (
    <div className="flex flex-col size-full text-white gap-8">
      <h1 className='font-bold text-3xl'>Previous Page</h1>

      <CallList type='ended' />
    </div>
  )
}

export default PreviousPage
