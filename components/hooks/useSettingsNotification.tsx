import { useEffect, useState } from "react"

export function useSettingsNotification() {
  const [showNotification, setShowNotification] = useState<boolean>(true)
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowNotification(false)
    }, 8000)
    return () => clearTimeout(timeOut)
  }, [])
  return showNotification
}