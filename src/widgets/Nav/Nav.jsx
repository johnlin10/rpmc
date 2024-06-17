import style from './Nav.module.scss'

export default function Nav() {
  return (
    <nav>
      <ul>
        <li className={style.icon_block}>
          <img
            src="/images/icon/block/RPMC_icon_block_256x256.png"
            alt="RPMC server block icon"
          ></img>
        </li>
        <li className={style.icon_text}>
          <img
            src="/images/icon/text/RPMC_icon_text_h256.png"
            alt="RPMC server text icon"
          />
        </li>
        <li></li>
      </ul>
    </nav>
  )
}
