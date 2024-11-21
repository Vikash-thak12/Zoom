/* eslint-disable @typescript-eslint/no-unused-vars */
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react";

export const useGetCallbyId  = (id: string | string[]) => {
    const [call, setCall] = useState<Call>();
    const [isCallLoading, setIsCallLoading] = useState(true)

    const client = useStreamVideoClient();

    useEffect(() => {
        if(!client) return; 
        const loadcall = async () => {
            try {
                const { calls } = await client.queryCalls({ filter_conditions: { id }})
                if(calls.length > 0) setCall(calls[0])
                setIsCallLoading(false)
            } catch (error) {
                console.log("Error in GetCallbyHooks", error)
                setIsCallLoading(false)
            }
        }
        loadcall()
    },[id, client])

    return { call, isCallLoading}
}