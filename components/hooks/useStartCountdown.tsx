import { RootState } from "@/redux/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export function useStartCountdown(startCountdown: () => void) {
  const globalState = useSelector((state: RootState) => state.global)
  useEffect(() => {
    if (globalState.status === "play") {
      startCountdown()
    }
  }, [globalState.status, startCountdown])
}