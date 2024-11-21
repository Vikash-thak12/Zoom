/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeCard from './Homecard';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';


const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  })
  const [calldetails, setCalldetails] = useState<Call>()

  const { user } = useUser()
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!user || !client) {
      console.error("User or Stream client is not available");
      return;
    }
  
    try {
      const id = crypto.randomUUID(); // Generate a unique ID for the call
      const call = client.call("default", id);
  
      if (!call) throw new Error("Failed to create a Call object");
  
      // Ensure `starts_at` is a valid ISO string
      const startsAt = values.dateTime.toISOString() || new Date().toISOString();
      const description = values.description || "Instant Meeting";
  
      // Create or fetch the call
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: { description },
        },
      });
  
      setCalldetails(call);
  
      // If no description, redirect to the meeting URL
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
    } catch (error) {
      console.error("Error on creating meeting:", error);
    }
  };
  


  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push('/recordings')}
      />


      {/* This is the popup model and will be opened when clicked on */}
      <MeetingModal
        isopen={meetingState === "isInstantMeeting"}
        onclose={() => setMeetingState(undefined)}
        title={"Start an Instant Meeting"}
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

    </section>
  );
};

export default MeetingTypeList; 