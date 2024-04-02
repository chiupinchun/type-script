import { CharacterInList } from '@/api/modules/character'
import Avatar from '@app/common/components/ui/avatar'
import { characters } from '@game/characters'
import { AllyCharacter } from '@game/characters/ally'
import { ArrayCharacter } from '@game/characters/array'
import { NumberCharacter } from '@game/characters/number'
import { StringCharacter } from '@game/characters/string'
import React, { FC, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  data: CharacterInList[]
  onChange: (id: string) => void
}

const CharacterItem: FC<{
  character: typeof AllyCharacter & {
    avatar: string
  }
}> = ({ character }) => {

  return (
    <>
      <div className='cursor-pointer'>
        <span>
          {character instanceof StringCharacter && 'str'}
          {character instanceof NumberCharacter && 'num'}
          {character instanceof ArrayCharacter && 'arr'}
        </span>
        <Avatar src={character.avatar} />
        <h5 className='text-sm text-gray-100'>{character.name}</h5>
      </div>
    </>
  )
}

const AvatarList: FC<Props> = ({ data, onChange }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <aside className='fixed z-10 h-full p-4 bg-slate-700 bg-opacity-50 overflow-y-scroll no-scrollbar'>
        <ul className={twMerge(
          'grid grid-cols-2 gap-4 w-fit h-fit transition-all',
          collapsed ? 'w-0 scale-x-0' : 'pe-6 w-32'
        )}>
          {data.map(item => (
            <li key={item.id} onClick={() => onChange(`${item.id}`)}>
              <CharacterItem character={characters[item.characterId]} />
            </li>
          ))}
        </ul>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className='btn small absolute right-1 top-1/2 -mt-5 rounded text-gray-300'
        >
          <div className={twMerge(
            'transition',
            collapsed ? 'rotate-180' : ''
          )}>&lt;</div>
        </button>
      </aside>
    </>
  )
}

export default AvatarList
