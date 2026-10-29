import { forwardRef } from 'react'
import type { CaseItem } from '../types'
import SkinVisual from './SkinVisual'
import './roulette.css'

interface Props {
  items: CaseItem[]
}

const RouletteStrip = forwardRef<HTMLDivElement, Props>(({ items }, ref) => {
  return (
    <div className="roulette">
      <div className="roulette__pointer" />
      <div className="roulette__track" ref={ref}>
        {items.map((item, index) => (
          <div className="roulette__item" key={`${item.weapon}-${item.name}-${index}`}>
            <SkinVisual item={item} compact />
          </div>
        ))}
      </div>
    </div>
  )
})

RouletteStrip.displayName = 'RouletteStrip'

export default RouletteStrip
