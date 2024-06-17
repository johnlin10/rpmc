import { useEffect, useState } from 'react'
import style from './Home.module.scss'
import axios from 'axios'

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
      <h1>RPMC Server Status</h1>
      {serverStatus ? (
        <>
          <h2
            className={`${style.onlineStatus} ${
              serverStatus.online ? style.online : style.offline
            }`}
          >
            {serverStatus.online ? 'Online' : 'Offline'}
          </h2>
          {serverStatus.online && (
            <>
              <p>Server: {serverStatus.host}</p>
              <p>Port: {serverStatus.port}</p>
              <p>Version: {serverStatus.version.name_clean}</p>
              <p>
                Online Players: {serverStatus.players.online} /{' '}
                {serverStatus.players.max}
              </p>
              {/* <pre>
            <code>{JSON.stringify(serverStatus, null, 2)}</code>
          </pre> */}
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
