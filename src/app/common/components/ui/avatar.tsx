import React, { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  src: string
  width?: number
  height?: number
  alt?: string
  className?: string
}

const Avatar: FC<Props> = ({
  src,
  width, height, alt, className
}) => {
  return (
    <>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={twMerge('rounded-full', className)}
      />
    </>
  )
}

export default Avatar
