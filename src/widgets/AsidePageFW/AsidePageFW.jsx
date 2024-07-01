import Aside from '../Aside/Aside'
import style from './AsidePageFW.module.scss'

export default function AsidePageFW() {
  return (
    <div className={style.view}>
      <Aside />
      <div className={style.container}></div>
    </div>
  )
}
