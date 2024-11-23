/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from 'react'

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { DialogTitle } from '@radix-ui/react-dialog'

interface MeetingModelProps {
    isopen: boolean,
    onclose: () => void,
    className?: string,
    title: string,
    children?: ReactNode,
    handleClick: () => void,
    buttonText?: string,
    image?: string,
    buttonIcon?: string
}

const MeetingModal = ({ isopen, onclose, className, title, children, handleClick, buttonText, image, buttonIcon }: MeetingModelProps) => {
    return (
        <Dialog open={isopen} onOpenChange={onclose}>
            <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
                <div className='flex flex-col gap-6'>
                    {image && (
                        <div className='flex justify-center items-center'>
                            <Image src={image} alt='Image' height={72} width={72} />
                        </div>
                    )}
                    <h1 className={cn("text-center text-3xl font-bold leading-[42px]", className)}>{title}</h1>
                    {children}
                    <Button className='bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0' onClick={handleClick}>
                        {buttonIcon && (
                            <Image src={buttonIcon} alt='ButtonIcon' width={13} height={13} />
                        )} &nbsp; 
                        {/* npsp for extra space  */}
                        {buttonText || "Schedule Meeting"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MeetingModal
