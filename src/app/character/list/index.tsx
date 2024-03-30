import React, { FC, useMemo } from 'react'
import AvatarList from './components/avatarList'
import Exhibition from './components/exhibition'
import { getCharacterById, getCharactersByUser } from '@/api/modules/character'
import { useFetch } from '@app/common/hooks/useFetch'
import { useSearchParams } from 'react-router-dom'

interface Props { }

const CharacterList: FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const characters = useFetch(
    () => getCharactersByUser('mockuuid')
  )

  const currentId = useMemo(() => {
    const searchParamsId = searchParams.get('id')
    if (searchParamsId) { return Number(searchParamsId) }
    return characters.data?.[0]?.id || null
  }, [searchParams, characters.data])

  const character = useFetch(
    () => currentId ? getCharacterById(currentId) : Promise.resolve(null),
    [currentId]
  )

  if (characters.pending || character.pending) {
    return (
      <div>資料加載中...</div>
    )
  }


  return (
    <>
      <main className='relative flex h-screen'>
        <AvatarList />
        {
          character?.data
            ? <Exhibition src={character.data.model} />
            : <div>找不到該角色QwQ</div>
        }
        <div>info</div>
      </main>
    </>
  )
}

export default CharacterList
