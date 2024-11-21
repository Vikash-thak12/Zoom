"use server"

import { currentUser } from "@clerk/nextjs/server"
import { StreamClient } from "@stream-io/node-sdk"

const stream_Api_key = process.env.NEXT_PUBLIC_STREAM_API_KEY
const stream_secret_key = process.env.STREAM_SECRET_KEY


export const tokenProvider = async() => {
    const user = await currentUser();

    if(!user) throw new Error("User is not Authenticated")
    if(!stream_Api_key) throw new Error ("No Stream key is provided")
    if(!stream_secret_key) throw new Error ("No Stream Secret is provided")

    const streamClient = new StreamClient(stream_Api_key, stream_secret_key)
    const expireTime = Math.floor(Date.now() / 1000) + 60; 
    const issueTime = Math.floor(Date.now() / 1000) - 60; 

    const token = streamClient.createToken(user.id, expireTime, issueTime)
    return token;
}