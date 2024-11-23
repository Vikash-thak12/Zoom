/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeCard from './Homecard';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';
import DatePicker from "react-datepicker";


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


  const { toast } = useToast();

  const { user } = useUser()
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!user || !client) {
      console.error("User or Stream client is not available");
      return;
    }

    try {
      if (!values.dateTime) {
        toast({ title: "Please Select a date and time" })
        return;
      }
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
      toast({ title: "Meeting Created:" })

    } catch (error) {
      console.error("Error on creating meeting:", error);
      toast({
        title: "Failed to create the Meeting"
      })
    }
  };


  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${calldetails?.id}`


  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push('/recordings')}
      />


      {/* This popup will be for Scheduling card */}
      {!calldetails ? (
        <MeetingModal
          isopen={meetingState === "isScheduleMeeting"}
          onclose={() => setMeetingState(undefined)}
          title={"Create Meeting"}
          // className="text-center"
          // buttonText="Start Meeting"
          handleClick={createMeeting}
        >

          <div className='flex flex-col gap-2.5'>
            <label>Add a Description</label>
            <Textarea 
            onChange={(e) => setValues({...values, description: e.target.value})}
            className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0' />
          </div>

          <div className='flex flex-col gap-2.5'>
            <label>Pick a date and Time</label>
            <DatePicker 
            selected={values.dateTime}
            onChange={(date) => setValues({...values, dateTime: date!})}
            // for showing the time
            showTimeSelect    
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='Time'
            dateFormat="MMMM d, yyyy h:mm aa"
            className='border-none bg-dark-3 px-2 py-1 rounded-md focus:outline-none w-full' />
          </div>

        </MeetingModal>
      ) : (
        <MeetingModal
          isopen={meetingState === "isScheduleMeeting"}
          onclose={() => setMeetingState(undefined)}
          title={"Meeting Created"}
          className="text-center"
          buttonText="Copy Meeting Link"
          buttonIcon='/icons/copy.svg' 
          image='/icons/checked.svg'
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast({ title: "Link Copied.."})
          }}
        />
      )}


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