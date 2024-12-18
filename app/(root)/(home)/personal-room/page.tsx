'use client'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { useGetCallbyId } from '@/hooks/useGetCallbyId'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'

import React from 'react'

const PersonalPage = () => {
  const Table = ({title, desc}: {title: string, desc: string}) => (
    <div className='flex flex-col md:flex-row md:gap-8'>
      <h1 className='font-bold md:text-3xl min-w-[180px]'>{title}</h1>
      <h1 className='font-semibold truncate md:text-2xl line-clamp-1 max-sm:max-w-[320px]'>{desc}</h1>
    </div>
  )

  const router = useRouter()

  const { user} = useUser()
  const client = useStreamVideoClient();
  const meetingId = user?.id;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`

  const { call} = useGetCallbyId(meetingId!);

  const startRoom = async () => {
    if(!client || !user) return;

    if(!call){
      const newCall = client.call('default', meetingId!)
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        }
      })
    }
    router.push(`/meeting/${meetingId}?personal=true`)
  }


  
  return (
    <div className='flex flex-col size-full text-white gap-8'>
      <h1 className='text-3xl font-bold'>Personal Room</h1>
      
      <div className='flex flex-col gap-8  bg-dark-1 rounded-xl p-3'>
        <Table title={"Vikash"} desc={`${user?.username?.toUpperCase()}'s meeting room`} />
        <Table title={"Meeting Id"} desc={meetingId!} />
        <Table title={"Invite Link"} desc={meetingLink} />
      </div>

      <div className='flex gap-5'>
        <Button className='bg-blue-1' onClick={startRoom}>
          Start Meeting
        </Button>
        <Button className='bg-dark-1' onClick={() => {
          navigator.clipboard.writeText(meetingLink)
          toast({ title: "Link Copied Successfully"})
        }}>
          Copy Invitation
        </Button>
      </div>
    </div>
  )
}

export default PersonalPage
