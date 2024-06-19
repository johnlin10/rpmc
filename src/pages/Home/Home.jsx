import { useEffect, useState } from 'react'
import style from './Home.module.scss'
import axios from 'axios'
import { useTooltip } from '../../Context/TooltipContext'
import Button from '../../widgets/Button.jsx/Button'

export default function Home() {
  return (
    <div className="view">
      <MinecraftServerStatus />
    </div>
  )
}

const MinecraftServerStatus = () => {
  const [serverStatus, setServerStatus] = useState(null)
  const [error, setError] = useState(null)

  const mcServer = process.env.REACT_APP_MINECRAFT_SERVER_IP

  // 使用 useEffect Hook 來獲取伺服器狀態
  useEffect(() => {
    // 定義一個異步函數以獲取伺服器狀態
    const fetchServerStatus = async () => {
      try {
        // 從伺服器 API 獲取狀態
        const response = await axios.get(
          `https://api.mcstatus.io/v2/status/java/${mcServer}` // 替換為 Minecraft 伺服器地址
        )
        console.log(response.data) // 將伺服器回應的資料輸出到控制台
        setServerStatus(response.data) // 設定伺服器狀態
      } catch (err) {
        setError(err.message) // 如果出錯，設定錯誤訊息
      }
    }

    // 初次執行一次獲取伺服器狀態
    fetchServerStatus()
    // 每隔 30 秒定期獲取伺服器狀態
    const interval = setInterval(fetchServerStatus, 30000)

    // 清除定時器，避免記憶體洩漏
    return () => clearInterval(interval)
  }, [])

  return (
    <>
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
          {/* <Button
            options={{
              text: 'Hello',
              size: 'small',
              action: () => {},
            }}
          /> */}
        </div>
      </div>
      <div className={style.serverStatus}>
        <div className={style.header}>
          <h1>Status </h1>
          {serverStatus && (
            <div
              className={`${style.onlineStatus} ${
                serverStatus.online ? style.online : style.offline
              }`}
            >
              <h2
                className={`${
                  serverStatus.online ? style.online : style.offline
                }`}
              >
                {serverStatus.online ? 'Online' : 'Offline'}
              </h2>
              <img
                src={`/images/mc_block/redstone/redstone_lamp_${
                  serverStatus.online ? 'on' : 'off'
                }.png`}
                alt=""
              />
            </div>
          )}
        </div>
        {serverStatus ? (
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
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
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
