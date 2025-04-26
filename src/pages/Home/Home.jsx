import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './Home.module.scss'
import axios from 'axios'
import { useTooltip } from '../../Context/TooltipContext'
import { useServer } from '../../Context/ServerContext'
import Button from '../../widgets/Button.jsx/Button'

export default function Home() {
  return (
    <div className="view">
      <div className={style.intro}>
        <div className={style.logo}>
          <img
            className={style.block}
            src="/images/icon/block/RPMC_icon_block_256x256.png"
            alt="RPMC server block icon"
          ></img>
          <img
            className={style.text}
            src="/images/icon/text/RPMC_icon_text_h256.png"
            alt="RPMC server text icon"
          />
        </div>
        <div className={style.about}>
          <p>
            A Minecraft server <br />
            runing on a Raspberry Pi.
          </p>
        </div>
      </div>
      <FeatureView />
    </div>
  )
}

// 功能操作版面
const FeatureView = () => {
  return (
    <div id="featureView" className={style.featureView}>
      <MinecraftServerStatus />
      <AboutView />
    </div>
  )
}

// RPMC 伺服器狀態
const MinecraftServerStatus = () => {
  const { serverStatus, loadingLamp } = useServer()

  const scrollToAbout = () => {
    const featureView = document.getElementById('featureView')
    const aboutView = document.getElementById('about')
    if (featureView && aboutView) {
      const scrollLeft = aboutView.offsetLeft - featureView.offsetLeft
      featureView.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }

  return (
    <>
      <div id="serverStatus" className={style.serverStatus}>
        <span className={style.aboutArrow} onClick={scrollToAbout}>
          About <span class={`material-symbols-outlined`}>double_arrow</span>
        </span>
        <div className={style.header}>
          <h1>Status</h1>
          <div
            className={`${style.onlineStatus} ${
              serverStatus && serverStatus.online ? style.online : style.offline
            }`}
          >
            <h2
              className={`${
                serverStatus && serverStatus.online
                  ? style.online
                  : style.offline
              }`}
            >
              {serverStatus
                ? serverStatus.online
                  ? 'Online'
                  : 'Offline'
                : 'Loading'}
              {}
            </h2>
            <img
              src={`/images/mc_block/redstone/redstone_lamp_${
                serverStatus
                  ? serverStatus.online
                    ? 'on'
                    : 'off'
                  : loadingLamp
              }.png`}
              alt=""
            />
          </div>
        </div>
        {serverStatus && (
          <>
            {serverStatus.online && (
              <div className={style.serverInfo}>
                <div className={style.serverInfoBlock}>
                  <p>Server</p>
                  <p>
                    {serverStatus.host}:{serverStatus.port}
                    <CopyButton
                      content={`${serverStatus.host}:${serverStatus.port}`}
                    />
                  </p>
                </div>
                <div className={style.serverInfoBlock}>
                  <p>Version</p>
                  <p>{serverStatus.version.name_clean}</p>
                </div>
                <div className={style.serverInfoBlock}>
                  <p>Online Players</p>
                  <p>
                    {serverStatus.players.online} / {serverStatus.players.max}
                  </p>
                </div>
                {/* <pre>
                <code>{JSON.stringify(serverStatus, null, 2)}</code>
              </pre> */}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

// 關於
const AboutView = () => {
  const { serverStatus } = useServer()

  return (
    <div id="about" className={style.aboutView}>
      <div className={style.header}>
        <h1>About</h1>
      </div>
      <div className={style.links}>
        <p>
          This is a Minecraft Java Edition server built by an individual. RPMC
          World is dedicated to preserving the original survival fun and
          allowing players to experience the purest Minecraft survival
          adventure.
        </p>
        <ul>
          <li
            className={!serverStatus && style.disabled}
            onClick={() =>
              window.open(
                `http://${process.env.REACT_APP_MINECRAFT_SERVER_MAP}`,
                '_blank'
              )
            }
          >
            <p>World Map</p>
            <span class="material-symbols-outlined">open_in_new</span>
          </li>
          <li
            className={style.disabled}
            //onClick={() => navigate('/rules')}
          >
            <p>World Rules (Coming Soon)</p>
            {/* <span class="material-symbols-outlined">arrow_forward</span> */}
          </li>
          <li className={style.disabled}>
            <p>Construction Methods (Coming Soon)</p>
            {/* <span class="material-symbols-outlined">arrow_outward</span> */}
          </li>
          <li
            onClick={() =>
              window.open('https://github.com/johnlin10/', '_blank')
            }
          >
            <p>Web Source Code</p>
            <span class="material-symbols-outlined">open_in_new</span>
          </li>
          <li className={style.disabled}>
            <p>Server Source Code (Coming Soon)</p>
            <span class="material-symbols-outlined">open_in_new</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

const CopyButton = ({ content }) => {
  const { showTooltip } = useTooltip()

  /**
   * 將內容複製到剪貼簿的函式
   */
  const copyToClipboard = () => {
    // 使用 navigator.clipboard API 將內容寫入剪貼簿
    navigator.clipboard
      .writeText(content) // 將變數 content 的值寫入剪貼簿
      .then(() => {
        // 如果成功，顯示提示訊息
        showTooltip('Copied to clipboard!') // 顯示 "Copied to clipboard!" 的提示訊息
      })
      .catch((err) => {
        // 如果失敗，輸出錯誤訊息
        console.error('Failed to copy content: ', err) // 在控制台顯示錯誤訊息和錯誤對象
      })
  }

  return (
    <button className={style.copyBtn} onClick={copyToClipboard}>
      Copy
    </button>
  )
}
