import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import axios from 'axios'

// 建立伺服器狀態的Context
const ServerContext = createContext()

// 自定義Hook提供給組件使用
export const useServer = () => {
  return useContext(ServerContext)
}

// Context提供者元件
export const ServerProvider = ({ children }) => {
  const [serverStatus, setServerStatus] = useState(null)
  const [error, setError] = useState(null)
  const [loadingLamp, setLoadingLamp] = useState('off')

  const mcServer = process.env.REACT_APP_MINECRAFT_SERVER_IP

  // 獲取伺服器狀態的函數
  const fetchServerStatus = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.mcstatus.io/v2/status/java/${mcServer}`
      )
      setServerStatus(response.data)
    } catch (err) {
      setError(err.message)
    }
  }, [mcServer])

  // 初始化及定期獲取伺服器狀態
  useEffect(() => {
    fetchServerStatus()
    const interval = setInterval(fetchServerStatus, 30000)
    return () => clearInterval(interval)
  }, [fetchServerStatus])

  // 控制Loading燈閃爍
  useEffect(() => {
    if (!serverStatus) {
      const intervalId = setInterval(() => {
        setLoadingLamp((prev) => (prev === 'on' ? 'off' : 'on'))
      }, 700)

      return () => clearInterval(intervalId)
    }
  }, [serverStatus])

  const value = {
    serverStatus,
    error,
    loadingLamp,
    fetchServerStatus,
  }

  return (
    <ServerContext.Provider value={value}>{children}</ServerContext.Provider>
  )
}
