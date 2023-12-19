import { RootState } from "@/redux/store"
import { RefObject, useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocalStorage } from "usehooks-ts"

export function useControlBackgroundMusic(audioRef: RefObject<HTMLAudioElement>, backgroundSounds: string) {
  const globalState = useSelector((state: RootState) => state.global)
  const [backgroundMusic, setBackgroundMusic] = useLocalStorage("backgroundMusic", true)
  useEffect(() => {
    if (audioRef.current) {
      console.log(1)
      if (backgroundMusic && globalState.status !== "idle" && backgroundSounds) {
        if (globalState.status === "play") {
          audioRef.current.volume = 0.12
        } else {
          audioRef.current.volume = 0.8
        }
        audioRef.current.play()
      } else {
        audioRef.current?.pause()
      }
    }
  }, [audioRef, backgroundMusic, backgroundSounds, globalState.status])

}