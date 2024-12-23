// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client'
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { toast } from '@/hooks/use-toast';

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
    const { endedCalls, upcomingCalls, callrecordings, isLoading } = useGetCalls();
    const [recordings, setRecordings] = useState<CallRecording[]>([])
    const router = useRouter();

    const getCalls = () => {
        switch (type) {
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
        switch (type) {
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

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(callrecordings?.map((meeting) => meeting.queryRecordings()) ?? [])

                const recordings = callData
                    .filter((call) => call.recordings.length > 0)
                    .flatMap((call) => call.recordings)

                setRecordings(recordings)
            } catch (error) {
                console.log("Error in callList", error)
                toast({ title: "Try Again Later" })
            }
        }
        if (type === "recordings") fetchRecordings();
    }, [type, callrecordings])

    const calls = getCalls();
    const nocallmessage = getNoCallsMessage()

    if (isLoading) return <Loader />
    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-5'>
            {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
                <MeetingCard
                    key={(meeting as Call)?.id}
                    icon={
                        type === "ended"
                            ? '/icons/previous.svg'
                            : type === "upcoming"
                                ? '/icons/upcoming.svg'
                                : '/icons/recordings.svg'
                    }
                    title={(meeting as Call).state?.custom?.description || meeting.filename?.substring(0,20) || "Personal Meeting"}

                    // I was getting issue in the date bc it shoud be startsAt instead of startedAt
                    date={(meeting as Call).state?.startsAt?.toLocaleString() || (meeting as CallRecording).start_time?.toLocaleString()}
                    isPreviousMeeting={type === "ended"}
                    buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                    handleClick={type === "recordings" ? () => {
                        router.push(`${meeting.url}`)
                    } : () => {
                        router.push(`/meeting/${meeting.id}`)
                    }}
                    link={type === "recordings" ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
                    buttonText={type === "recordings" ? "Play" : "Start"}
                />
            )) : (
                <h1>{nocallmessage}</h1>
            )}
        </div>
    )
}

export default CallList
