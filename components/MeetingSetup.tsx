/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({ setIsSetupComplete}: {setIsSetupComplete: (value: boolean) => void}) => {
    const [ismicCamToggledOn, setIsmicCamToggledOn] = useState(false)

    const call = useCall()

    if (!call) {
        throw new Error("useCall must be used within Streamcall Component")
    }

    useEffect(() => {
        if (ismicCamToggledOn) {   //if mic and camera is enable then turned it off
            call?.camera.disable()
            call?.microphone.disable()
        } else {
            call?.camera.enable()
            call?.microphone.enable()
        }

    }, [ismicCamToggledOn, call?.camera, call?.microphone])
    return (
        <div className='flex h-screen w-full flex-col items-center justify-center gap-3'>
            <h1 className='font-bold text-3xl'>Setup Meeting</h1>
                <VideoPreview className='text-3xl flex items-center justify-center font-bold' />
            {/* <div className="w-full h-full overflow-hidden flex items-center justify-center text-2xl font-semibold">
            </div> */}

            <div className='flex items-center justify-center h-16 gap-3'>
                <label className='flex items-center justify-center gap-5'>
                    <input type="checkbox" checked={ismicCamToggledOn} onChange={(e) => setIsmicCamToggledOn(e.target.checked)} style={{
                        width: '20px',
                        height: '20px',
                    }} />
                    Join with Mic and Camera
                </label>
                <DeviceSettings />
            </div>
            <Button className='rounded-md bg-green-500 px-4 py-2.5' onClick={() => {
                call.join()
                setIsSetupComplete(true)
            }}>
                Join Meeting
            </Button>
        </div>
    )
}

export default MeetingSetup
