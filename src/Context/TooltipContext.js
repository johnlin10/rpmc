import React, { createContext, useState, useContext } from 'react'

const TooltipContext = createContext()

export const useTooltip = () => useContext(TooltipContext)

export const TooltipProvider = ({ children }) => {
  const [tooltip, setTooltip] = useState({ message: '', visible: false })

  const showTooltip = (message) => {
    setTooltip({ message, visible: true })
    setTimeout(() => {
      setTooltip({ message: '', visible: false })
    }, 2000)
  }

  return (
    <TooltipContext.Provider value={{ tooltip, showTooltip }}>
      {children}
    </TooltipContext.Provider>
  )
}
