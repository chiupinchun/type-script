import { getImgUrl } from '@/utils/getImgUrl'
import Avatar from '@app/common/components/ui/avatar'
import React, { FC } from 'react'

interface Props { }

const Page: FC<Props> = () => {
  return (
    <>
      <div>
        <div className='flex items-center gap-x-5'>
          <Avatar src={getImgUrl('defaultAvatar.webp')} width={75} height={75} className='md:w-32' />
          <div className='flex flex-col justify-center gap-y-3'>
            <h5>小魔精</h5>
            <div className='w-32 h-4 hp-bar'>
              <div style={{ width: `${95}%` }}></div>
            </div>
            <ul>
              <li className='flex justify-center items-center w-8 h-8 border rounded-sm'>^</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
