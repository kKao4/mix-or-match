import styles from "@/styles/Home.module.scss"
import Card from "@/components/Card/Card"
import { Variants, motion } from "framer-motion"
import { cards, shuffleArray } from "@/data/Cards"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { lunacyFont } from "./_app"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { restartCardGame } from "@/redux/cardGameSlice"
import { useCountdown } from 'usehooks-ts'
import ClickToStart from '@/components/ClickToStart/ClickToStart';
import GameOver from '@/components/GameOver/GameOver';
import Victory from "@/components/Victory/Victory"
import dynamic from "next/dynamic"
import { useControlBackgroundMusic } from "@/components/hooks/useControlBackgroundMusic"
import { useChooseWrongOrRightCards } from "@/components/hooks/useChooseWrongOrRightCards"
import { useGenerateCardsOrder } from "@/components/hooks/useGenerateCardsOrder"
import { useStartCountdown } from "@/components/hooks/useStartCountdown"
import { useGameOver } from "@/components/hooks/useGameOver"
import { useVictory } from "@/components/hooks/useVictory"
import { useLockScroll } from "@/components/hooks/useLockScroll"
import { useSounds } from "@/components/hooks/useSounds"
const DynamicSettings = dynamic(() => import("@/components/Settings/Settings"))

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const globalState = useSelector((state: RootState) => state.global)
  const cardGameState = useSelector((state: RootState) => state.cardGame)
  const dispatch = useDispatch<AppDispatch>()
  const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
    countStart: 60,
    intervalMs: 1000
  })
  // shuffle the cards
  const [order, setOrder] = useGenerateCardsOrder()

  // all sounds
  const { wrongChooseSounds, rightChooseSounds, restartSounds, backgroundSounds } = useSounds()

  // control play/stop background music
  useControlBackgroundMusic(audioRef, backgroundSounds)

  // start countdown
  useStartCountdown(startCountdown)

  // game over
  useGameOver({ count })

  // victory 
  useVictory({ count, stopCountdown })

  // right/wrong choose
  useChooseWrongOrRightCards({ rightChooseSounds, wrongChooseSounds })

  // lock scroll
  useLockScroll()

  // restart game
  const restartGame = useCallback(() => {
    dispatch(restartCardGame())
    resetCountdown()
    setTimeout(() => {
      setOrder(shuffleArray(Array.from({ length: cards.length }, (_, i) => i + 1)))
    }, 600)
    const audio = new Audio(restartSounds[Math.floor(Math.random() * restartSounds.length)])
    audio.play()
  }, [dispatch, resetCountdown, restartSounds, setOrder])

  const revealVariants: Variants = useMemo(() => {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.8, delay: 0.2 } }
    }
  }, [])
  return (
    <>
      <DynamicSettings handleOpen={() => stopCountdown()} handleClose={() => startCountdown()} />
      <ClickToStart />
      <GameOver handleOnClick={restartGame} />
      <Victory handleOnClick={restartGame} />
      <audio
        src={backgroundSounds}
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
