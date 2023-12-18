import { RootState } from "@/redux/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useLockedBody } from "usehooks-ts"

export function useLockScroll() {
  const globalState = useSelector((state: RootState) => state.global)
  const [locked, setLocked] = useLockedBody(false, 'root')
  useEffect(() => {
    if (globalState.status !== "play") {
      setLocked(true)
    } else {
      setLocked(false)
    }
  }, [globalState.status, setLocked])

}