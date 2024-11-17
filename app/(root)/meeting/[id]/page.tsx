import React from 'react'

const MeetingPage = ({ params }: { params: {id: string}}) => {
  return (
    <div>
      <h1>Metting page: {params.id}</h1>
    </div>
  )
}

export default MeetingPage
