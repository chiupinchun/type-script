import { Decorator } from '@game/decorators'
import React, { FC, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { twMerge } from 'tailwind-merge'

interface DecoratorItemProps {
  decorator: Decorator | null
  onSelect: (decorator: Decorator | null) => void
}

const DecoratorItem: FC<DecoratorItemProps> = ({ decorator, onSelect }) => {

  const handleSelect: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    onSelect(decorator)
  }

  const content = decorator
    ? <div
      className='relative w-full h-full rounded-full shadow-lg shadow-slate-900'
      style={{
        backgroundColor: decorator.color
      }}
    />
    : <div className='relative -z-10 w-full h-full rounded-full bg-slate-300' />

  return (
    <>
      <div
        onClick={handleSelect}
        className='w-12 h-12 rounded-full border-8 border-zinc-300 shadow-inner shadow-slate-900'
      >
        {content}
      </div>
    </>
  )
}

const DecoratorInfo: FC<{
  decorator: Decorator
  onClose: () => void
}> = ({ decorator, onClose }) => {
  return (
    <div className='relative p-3 text-slate-200'>
      <h3 className='text-xl font-bold'>{decorator.name}</h3>
      <h4 className='my-2 font-bold'>詞條</h4>
      <ul className='rounded bg-slate-300 text-black'>
        {decorator.affixes.map((affix, idx) => (
          <li key={idx} className='p-2 border-b last:border-b-0'>
            提高 {affix.value}{affix.type === 'percent' ? '% ' : ' 點'}的{affix.attr}
          </li>
        ))}
      </ul>
      <h4 className='mt-2 font-bold'>二件套：</h4>
      <p>{decorator.on2set.description}</p>
      <h4 className='mt-2 font-bold'>三件套：</h4>
      <p>{decorator.on3set.description}</p>

      <button onClick={onClose} className='absolute top-1 right-3 text-lg'>x</button>
    </div>
  )
}

interface DecoratorListProps {
  decorators: Decorator[]
}

const CharacterDecoratorList: FC<DecoratorListProps> = ({ decorators }) => {
  const [selectedDecorator, setSelectedDecorator] = useState<Decorator | null>(null)

  useEffect(() => {
    const onClickDocument = () => {
      setSelectedDecorator(null)
    }
    document.addEventListener('click', onClickDocument)

    return () => document.removeEventListener('click', onClickDocument)
  }, [])

  return (
    <>
      <div className='flex flex-col justify-between mx-auto mt-5 w-56 h-48'>
        <div className='flex justify-around'>
          <DecoratorItem decorator={decorators[0] ?? null} onSelect={setSelectedDecorator} />
          <DecoratorItem decorator={decorators[1] ?? null} onSelect={setSelectedDecorator} />
        </div>
        <div className='flex justify-between'>
          <DecoratorItem decorator={decorators[2] ?? null} onSelect={setSelectedDecorator} />
          <DecoratorItem decorator={decorators[3] ?? null} onSelect={setSelectedDecorator} />
        </div>
        <div className='flex justify-around'>
          <DecoratorItem decorator={decorators[4] ?? null} onSelect={setSelectedDecorator} />
          <DecoratorItem decorator={decorators[5] ?? null} onSelect={setSelectedDecorator} />
        </div>
      </div>
      {ReactDOM.createPortal(
        <div onClick={e => e.stopPropagation()} className={twMerge(
          'fixed z-10 top-0 h-screen shadow bg-slate-500 transition-all',
          selectedDecorator ? 'w-96' : 'w-0'
        )}>
          {selectedDecorator && <DecoratorInfo
            onClose={() => setSelectedDecorator(null)}
            decorator={selectedDecorator}
          />}
        </div>,
        document.body
      )}
    </>
  )
}

export default CharacterDecoratorList
