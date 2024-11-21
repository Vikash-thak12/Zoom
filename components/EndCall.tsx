'use client'
import React from 'react'
import { Button } from './ui/button'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

const EndCall = () => {

    const router = useRouter();
    const call = useCall()
    const { useLocalParticipant} = useCallStateHooks()
    const LocalParticipant = useLocalParticipant()
    const isMeetingOwner = LocalParticipant && call?.state.createdBy && LocalParticipant.userId === call.state.createdBy.id;

    if(!isMeetingOwner) return null;
  return (
    <Button className='bg-red-500' onClick={ async() => {
        await call.endCall();
        router.push("/")
        toast({
            title: "Meeting Deleted Successfully"
        })
    }}>
      End Call for Everyone
    </Button>
  )
}

export default EndCall
