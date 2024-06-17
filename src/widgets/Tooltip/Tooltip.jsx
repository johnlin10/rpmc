import style from './Tooltip.module.scss'
import { useTooltip } from '../../Context/TooltipContext'

export default function Tooltip() {
  const { tooltip } = useTooltip()

  return (
    <>
      {tooltip.visible && (
        <div className={style.tooltip}>{tooltip.message}</div>
      )}
    </>
  )
}
