import React, { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  options: string[]
  value?: string
  onChange?: (option: string) => void
  children?: React.ReactNode
}

const Tab: FC<Props> = ({ options, value, onChange, children }) => {

  return (
    <>
      <div className='pt-1 w-1/2'>
        <ul className='flex space-x-3 min-w-full overflow-x-auto border-b no-scrollbar'>
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
        {children}
      </div>
    </>
  )
}

export default Tab
