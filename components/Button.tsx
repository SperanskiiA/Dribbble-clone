import Image from 'next/image'
import React from 'react'

type ButtonProps = {
    title: string
    type?: 'button' | 'submit'
    leftIcon?: string
    rightIcon?: string
    children?: React.ReactNode
    isSubmitting?: boolean
    handleClick?: React.MouseEventHandler
    bgColor?: string
    textColor?: string
}

const Button = ({
    title,
    type,
    leftIcon,
    children,
    isSubmitting,
    handleClick,
    bgColor,
    textColor,
    rightIcon,
}: ButtonProps) => {
    return (
        <button
            type={type || 'button'}
            disabled={isSubmitting}
            className={`flexCenter gap-3 px-4 py-3 
            ${textColor ? textColor : 'text-white'}
            ${
                isSubmitting
                    ? 'bg-black/50'
                    : bgColor
                    ? bgColor
                    : 'bg-primary-purple'
            } rounded-xl text-sm font-medium max-md:w-full`}
            onClick={handleClick}
        >
            {leftIcon && (
                <Image src={leftIcon} width={16} height={16} alt="left" />
            )}
            {title}
            {rightIcon && (
                <Image src={rightIcon} width={16} height={16} alt="right" />
            )}
        </button>
    )
}

export default Button
