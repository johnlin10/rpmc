import { useEffect, useState } from 'react'
import style from './Home.module.scss'
import axios from 'axios'
import { useTooltip } from '../../Context/TooltipContext'

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

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await axios.get(
          `https://api.mcstatus.io/v2/status/java/${process.env.REACT_APP_MINECRAFT_SERVER_IP}`
        )
        console.log(response.data)
        setServerStatus(response.data)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchServerStatus()
    const interval = setInterval(fetchServerStatus, 30000) // 每 30 秒請求一次

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={style.serverStatus}>
      <h1>RPMC World </h1>
      {serverStatus ? (
        <>
          <div className={style.onlineStatus}>
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
                <p>Java Edition {serverStatus.version.name_clean}</p>
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
  )
}

const CopyButton = ({ content }) => {
  const { showTooltip } = useTooltip()

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        showTooltip('Copied to clipboard!')
      })
      .catch((err) => {
        console.error('Failed to copy content: ', err)
      })
  }

  return (
    <button className={style.copyBtn} onClick={copyToClipboard}>
      Copy
    </button>
  )
}
