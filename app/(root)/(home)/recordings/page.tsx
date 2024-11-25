import CallList from '@/components/CallList'
import React from 'react'

const RecodingPage = () => {
  return (
    <div className='text-white flex flex-col gap-8'>
      <h1 className='text-3xl font-bold'>Recording page</h1>

      <CallList type='recordings' />
    </div>
  )
}

export default RecodingPage
