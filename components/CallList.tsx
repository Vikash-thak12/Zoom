'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" } ) => {
    const { endedCalls, upcomingCalls, callrecordings, isLoading} = useGetCalls();
    const [recordings, setRecordings] = useState<CallRecording[]>([])
    const router = useRouter();

    const getCalls = () => {
        switch(type){
            case "ended":
                return endedCalls
            case "upcoming":
                return upcomingCalls
            case "recordings":
                return recordings
            default:
                return []
        }
    }


    const getNoCallsMessage = () => {
        switch(type){
            case "ended":
                return "No Previous calls"
            case "upcoming":
                return "No Upcoming calls"
            case "recordings":
                return "No Recordings"
            default:
                return ''
        }
    }

    const calls = getCalls(); 
    const nocallmessage = getNoCallsMessage()
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 gap-5'>
      {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
        <MeetingCard />
      )): (
        <h1>Nothing</h1>
      )}
    </div>
  )
}

export default CallList
