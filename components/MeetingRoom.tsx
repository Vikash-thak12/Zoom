/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from '@/lib/utils'
import { CallControls, CallParticipantsList, CallStatsButton, PaginatedGridLayout, ParticipantDetails, SpeakerLayout } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, User } from 'lucide-react'
import { Button } from './ui/button'
import { useSearchParams } from 'next/navigation'
import EndCall from './EndCall'


type callLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {

    const [layout, setLayout] = useState<callLayoutType>('speaker-left')
    const [showParticipants, setShowParticipants] = useState(false)

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="right" />
            default:
                return <SpeakerLayout participantsBarPosition="left" />
        }
    }

    const searchParams = useSearchParams()
    const isPersonalRoom = !!searchParams.get("personal")

    return (
        <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
            <div className='relative flex size-full items-center justify-center'>
                {/* This below div is for showing the video on the screen */}
                <div className='flex size-full max-w-[500px] items-center'>
                    <CallLayout />
                </div>

                {/* This is for showing all the participants in the meeting */}
                <div className={cn("h-[calc(100vh-86px)] hidden ml-2 md:fixed right-10", { 'show-block': showParticipants })}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>
            <div className='fixed bottom-10 flex flex-wrap w-full items-center justify-center px-10 gap-5'>
                <CallControls />

                <DropdownMenu>
                    <div className='flex items-center'>
                        <DropdownMenuTrigger className='cursor-pointer'>
                            <LayoutList />
                        </DropdownMenuTrigger>

                    </div>
                    <DropdownMenuContent className='bg-dark-1 border-dark-1 text-white'>
                        {["Grid", 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                            <div key={index}>
                                <DropdownMenuItem className='cursor-pointer' onClick={() => {
                                    item.toLowerCase() as callLayoutType
                                }}>
                                    {item}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className='border-dark-1' />
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton /> 

                <Button onClick={() => setShowParticipants((prev) => !prev)}>
                    <div className='cursor-pointer rounded-md'>
                        <User size={20} className='text-white' />
                    </div>
                </Button>
                {!isPersonalRoom && <EndCall />}
            </div>
        </section>
    )
}

export default MeetingRoom
