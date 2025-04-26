import style from './WorldMap.module.scss'
import { Helmet } from 'react-helmet'

export default function WorldMap() {
  return (
    <div className={style.mapView}>
      <Helmet>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Helmet>
      <div className={style.controller} onClick={() => window.history.back()}>
        <span class="material-symbols-outlined">arrow_back</span>
      </div>
      <iframe
        title="RPMC world map"
        src="http://147.185.221.20:33566"
        frameborder="0"
      ></iframe>
    </div>
  )
}
