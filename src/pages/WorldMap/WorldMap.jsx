import style from './WorldMap.module.scss'

export default function WorldMap() {
  return (
    <div className={style.mapView}>
      <div className={style.controller} onClick={() => window.history.back()}>
        <span class="material-symbols-outlined">arrow_back</span>
      </div>
      <iframe src="http://147.185.221.20:33566" frameborder="0"></iframe>
    </div>
  )
}
