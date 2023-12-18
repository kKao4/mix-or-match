import { loseMemeSounds, wrongChooseMemeSounds, victoryMemeSounds, victoryNormalSounds, restartMemeSounds, rightChooseMemeSounds, rightChooseNormalSounds, rightChooseAnimeSounds, wrongChooseAnimeSounds, loseAnimeSounds, victoryAnimeSounds, backgroundNormalSounds, backgroundMemeSounds } from "@/data/Sound"
import { RootState } from "@/redux/store"
import { useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { useLocalStorage } from "usehooks-ts"

export function useSounds() {
  const globalState = useSelector((state: RootState) => state.global)
  const [animeSounds, setAnimeSounds] = useLocalStorage("animeSounds", false)
  const [normalSounds, setNormalSounds] = useLocalStorage("normalSounds", true)
  const [memeSounds, setMemeSounds] = useLocalStorage("memeSounds", false)
  const wrongChooseSounds = useMemo(() => {
    let sounds: string[] = []
    if (memeSounds) {
      sounds = sounds.concat(wrongChooseMemeSounds)
    }
    if (animeSounds) {
      sounds = sounds.concat(wrongChooseAnimeSounds)
    }
    return sounds
  }, [animeSounds, memeSounds])
  const rightChooseSounds = useMemo(() => {
    let sounds: string[] = []
    if (normalSounds) {
      sounds = sounds.concat(rightChooseNormalSounds)
    }
    if (memeSounds) {
      sounds = sounds.concat(rightChooseMemeSounds)
    }
    if (animeSounds) {
      sounds = sounds.concat(rightChooseAnimeSounds)
    }
    return sounds;
  }, [animeSounds, memeSounds, normalSounds])
  const loseSounds = useMemo(() => {
    let sounds: string[] = []
    if (memeSounds) {
      sounds = sounds.concat(loseMemeSounds)
    }
    if (animeSounds) {
      sounds = sounds.concat(loseAnimeSounds)
    }
    return sounds
  }, [animeSounds, memeSounds])
  const victorySounds = useMemo(() => {
    let sounds: string[] = []
    if (normalSounds) {
      sounds = sounds.concat(victoryNormalSounds)
    }
    if (memeSounds) {
      sounds = sounds.concat(victoryMemeSounds)
    }
    if (animeSounds) {
      sounds = sounds.concat(victoryAnimeSounds)
    }
    return sounds
  }, [animeSounds, memeSounds, normalSounds])
  const restartSounds = useMemo(() => {
    let sounds: string[] = []
    if (memeSounds) {
      sounds = sounds.concat(restartMemeSounds)
    }
    return sounds
  }, [memeSounds])
  const backgroundSounds = useMemo(() => {
    let sounds: string = ""
    if (globalState.status === "lose") {
      sounds = loseSounds[Math.floor(Math.random() * loseSounds.length)]
    } else if (globalState.status === "victory") {
      sounds = victorySounds[Math.floor(Math.random() * victorySounds.length)]
    } else if (globalState.status === "play" && memeSounds) {
      sounds = backgroundMemeSounds[Math.floor(Math.random() * backgroundMemeSounds.length)]
    } else if (globalState.status === "play" && normalSounds) {
      sounds = backgroundNormalSounds[Math.floor(Math.random() * backgroundNormalSounds.length)]
    }
    return sounds
  }, [globalState.status, loseSounds, memeSounds, normalSounds, victorySounds])
  return { wrongChooseSounds, rightChooseSounds, loseSounds, victorySounds, restartSounds, backgroundSounds }
}