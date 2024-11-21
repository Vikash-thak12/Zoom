/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from 'react'

interface MeetingModelProps{
    isopen: boolean, 
    onclose: () => void, 
    className?: string, 
    title: string, 
    children?: ReactNode, 
    handleClick: () => void, 
    buttonText?: string, 
    image: string, 
    buttonIcon?: string
}

const MeetingModal = ({ isopen, onclose, className, title, children, handleClick, buttonText, image, buttonIcon}: MeetingModelProps) => {
  return (
    <div>
      Meeting Modal
    </div>
  )
}

export default MeetingModal
