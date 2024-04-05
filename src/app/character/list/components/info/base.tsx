import { isSubclass } from '@/utils/prototype'
import { AllyCharacter } from '@game/characters/ally'
import { StringCharacter } from '@game/characters/string'
import React, { FC } from 'react'

interface Props {
  character: AllyCharacter
}

const CharacterBaseInfo: FC<Props> = ({ character }) => {

  return (
    <>
      <h2 className='font-bold text-lg'>{character.name} Lv.{character.lv}</h2>

      <table className='my-5 w-full text-left table-fixed'>
        <thead>
          <tr>
            <th>陣營</th>
            <th>連攜</th>
            <th>定位</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {isSubclass(character, StringCharacter) && '史特林'}
            </td>
            <td>史特林</td>
            {/* TODO: 之後需要判斷輸出手、破盾手、輔助、坦克 */}
            <td>輸出手</td>
          </tr>
        </tbody>
      </table>

      <div className='flex'>
        <ul className='flex-auto'>
          <li className='flex justify-between pe-3 border-b'>生命 <span>{character.maxHp}</span></li>
          <li className='flex justify-between pe-3 border-b'>攻擊 <span>{character.atk}</span></li>
          <li className='flex justify-between pe-3 border-b'>防禦 <span>{character.def}</span></li>
          <li className='flex justify-between pe-3 border-b'>爆擊率 <span>{character.critical} %</span></li>
          <li className='flex justify-between pe-3 border-b'>爆擊傷害 <span>{character.criDmg} %</span></li>
          <li className='flex justify-between pe-3 border-b'>總傷害 <span>{character.totalDmg} %</span></li>
        </ul>
        <div className='w-10'></div>
        <ul className='flex-auto'>
          <li className='flex justify-between pe-3 border-b'>破盾效率 <span>{character.breakShieldRate} %</span></li>
          <li className='flex justify-between pe-3 border-b'>異常賦予率 <span>{character.stateImposeRate} %</span></li>
          <li className='flex justify-between pe-3 border-b'>異常抵抗率 <span>{character.stateRisistRate} %</span></li>
        </ul>
      </div>
    </>
  )
}

export default CharacterBaseInfo
