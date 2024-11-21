/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface MeetingModelProps {
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

const MeetingModal = ({ isopen, onclose, className, title, children, handleClick, buttonText, image, buttonIcon }: MeetingModelProps) => {
    return (
        <Dialog open={isopen} onOpenChange={onclose}>
            <DialogContent>

            </DialogContent>
        </Dialog>
    )
}

export default MeetingModal
