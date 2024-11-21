/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallbyId } from '@/hooks/useGetCallbyId';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { use, useState } from 'react'

const MeetingPage = ({ params }: { params: Promise<{id: string}>}) => {

  const { id } = use(params)

  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { user, isLoaded } = useUser();

  const { call, isCallLoading } = useGetCallbyId(id);

  if(!isLoaded || isCallLoading) return <Loader />
  
  return (
    <main className='h-screen w-full text-white'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default MeetingPage
