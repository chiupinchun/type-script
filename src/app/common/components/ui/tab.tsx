import React, { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  options: string[]
  value?: string
  onChange?: (option: string) => void
  children?: React.ReactNode
  className?: string
}

const Tab: FC<Props> = ({ options, value, onChange, children, className }) => {

  return (
    <>
      <div className={twMerge('pt-1', className)}>
        <ul className='flex min-w-full overflow-x-auto border-b no-scrollbar'>
          {options.map((option, idx) => (
            <li key={idx}>
              <a
                onClick={() => onChange && onChange(option)}
                className={twMerge(
                  'block px-3 py-2 w-max cursor-pointer',
                  value === option ? 'border border-b-0' : ''
                )}
              >{option}</a>
            </li>
          ))}
        </ul>
        <div className='px-3 py-2'>{children}</div>
      </div>
    </>
  )
}

export default Tab
