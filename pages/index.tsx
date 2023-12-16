import styles from "@/styles/Home.module.scss"
import Card from "@/components/Card/Card"
import { Variants, motion } from "framer-motion"
import { cards, shuffleArray } from "@/data/Cards"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { lunacyFont } from "./_app"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { resetSelectedCards, addDisabledCards, removeActiveCards, toggleIsAnimating, restartCardGame } from "@/redux/cardGameSlice"
import { useCountdown } from 'usehooks-ts'
import { toggleStatusGame } from "@/redux/globalSlice"
import ClickToStart from '@/components/ClickToStart/ClickToStart';
import GameOver from '@/components/GameOver/GameOver';
import { useLockedBody } from 'usehooks-ts'
import Victory from "@/components/Victory/Victory"
import { loseMemeSounds, wrongChooseMemeSounds, victoryMemeSounds, victoryNormalSounds, restartMemeSounds, rightChooseMemeSounds, rightChooseNormalSounds, rightChooseAnimeSounds, wrongChooseAnimeSounds, loseAnimeSounds, victoryAnimeSounds } from "@/data/Sound"
import Settings from "@/components/Settings/Settings"
import { useLocalStorage } from "usehooks-ts"

// TODO: add notification for settings

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [order, setOrder] = useState<number[]>()
  const globalState = useSelector((state: RootState) => state.global)
  const cardGameState = useSelector((state: RootState) => state.cardGame)
  const dispatch = useDispatch<AppDispatch>()
  const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
    countStart: 60,
    intervalMs: 1000
  })
  const [locked, setLocked] = useLockedBody(false, 'root')
  const [animeSounds, setAnimeSounds] = useLocalStorage("animeSounds", false)
  const [backgroundMusic, setBackgroundMusic] = useLocalStorage("backgroundMusic", true)
  const [normalSounds, setNormalSounds] = useLocalStorage("normalSounds", true)
  const [memeSounds, setMemeSounds] = useLocalStorage("memeSounds", true)

  // shuffle the cards
  useEffect(() => {
    setOrder(shuffleArray(Array.from({ length: cards.length }, (_, i) => i + 1)))
  }, [])

  // play/stop background music
  useEffect(() => {
    if (audioRef.current) {
      if (globalState.status === "play" && backgroundMusic) {
        audioRef.current.volume = 0.3
        audioRef.current.play()
      } else {
        audioRef.current?.pause()
      }
    }
  }, [backgroundMusic, globalState.status])

  // start countdown
  useEffect(() => {
    if (globalState.status === "play") {
      startCountdown()
    }
  }, [count, globalState.status, startCountdown])

  const wrongChooseSounds = useMemo(() => {
    let sounds: string[] = []
    if (memeSounds) {
      sounds = sounds.concat(wrongChooseMemeSounds)
      console.log("1")
    }
    if (animeSounds) {
      sounds = sounds.concat(wrongChooseAnimeSounds)
      console.log("2")
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

  // game over
  useEffect(() => {
    if (count === 0) {
      dispatch(toggleStatusGame("lose"))
      const audio = new Audio(loseSounds[Math.floor(Math.random() * loseSounds.length)])
      audio.play()
    }
  }, [count, dispatch, loseSounds])

  // victory 
  useEffect(() => {
    if (cardGameState.activeCards.length === 0) {
      dispatch(toggleStatusGame("victory"))
      stopCountdown()
      const audio = new Audio(victorySounds[Math.floor(Math.random() * victorySounds.length)])
      audio.play()
    }
  }, [cardGameState.activeCards.length, dispatch, stopCountdown, victorySounds])

  // right/wrong choose
  useEffect(() => {
    if (cardGameState.selectedCards.length === 2 && cardGameState.selectedCards[0].name === cardGameState.selectedCards[1].name) {
      dispatch(addDisabledCards([cardGameState.selectedCards[0], cardGameState.selectedCards[1]]))
      dispatch(removeActiveCards([cardGameState.selectedCards[0], cardGameState.selectedCards[1]]))
      dispatch(resetSelectedCards())
      const audio = new Audio(rightChooseSounds[Math.floor(Math.random() * rightChooseSounds.length)])
      audio.play()
    } else if (cardGameState.selectedCards.length === 2 && cardGameState.selectedCards[0].name !== cardGameState.selectedCards[1].name) {
      dispatch(toggleIsAnimating(true))
      setTimeout(() => {
        dispatch(toggleIsAnimating(false))
        dispatch(resetSelectedCards())
      }, 500)
      const audio = new Audio(wrongChooseSounds[Math.floor(Math.random() * wrongChooseSounds.length)])
      audio.play()
    }
  }, [cardGameState.selectedCards, dispatch, rightChooseSounds, wrongChooseSounds])

  // lock scroll
  useEffect(() => {
    if (globalState.status !== "play") {
      setLocked(true)
    } else {
      setLocked(false)
    }
  }, [globalState.status, setLocked])

  // restart game
  const restartGame = useCallback(() => {
    dispatch(restartCardGame())
    resetCountdown()
    setTimeout(() => {
      setOrder(shuffleArray(Array.from({ length: cards.length }, (_, i) => i + 1)))
    }, 600)
    const audio = new Audio(restartSounds[Math.floor(Math.random() * restartSounds.length)])
    audio.play()
  }, [dispatch, resetCountdown, restartSounds])

  const revealVariants: Variants = useMemo(() => {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.8, delay: 0.2 } }
    }
  }, [])
  return (
    <>
      <Settings handleOpen={() => stopCountdown()} handleClose={() => startCountdown()} />
      <ClickToStart />
      <GameOver handleOnClick={restartGame} />
      <Victory handleOnClick={restartGame} />
      <audio
        src="/Assets_Audio_creepy.mp3"
        loop
        ref={audioRef}
        data-test="background-music"
      />
      <div className={styles.container}>
        <motion.h1
          className={styles.lead}
          initial="hidden"
          animate="show"
          variants={revealVariants}>Mix-Or-Match</motion.h1>
        <motion.div
          className={styles.status}
          initial="hidden"
          animate="show"
          variants={revealVariants}
        >
          <p className={lunacyFont.className + " " + styles.time}>Time: <span className={styles.number} data-test="countdown">{count}</span></p>
          <p className={lunacyFont.className + " " + styles.flip}>Flips: <span className={styles.number} data-test="flips">{cardGameState.flips}</span></p>
        </motion.div>
        {order && (
          <motion.div
            className={styles.cardContainer}
            initial="hidden"
            animate="show"
            variants={revealVariants}
          >
            {cards.map((card, i) => {
              if (order) {
                return (
                  <Card
                    key={i}
                    src={card.src}
                    id={card.id}
                    name={card.name}
                    order={order[i]}
                  />
                )
              }
            })}
          </motion.div>
        )}
      </div>
    </>
  )
}
