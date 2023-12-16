import Image from "next/image"
import styles from "./Card.module.scss"
import spider from "@/assets/Spider.png"
import web from "@/assets/Cobweb.png"
import webGray from "@/assets/CobwebGrey.png"
import { motion, Variants } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { toggleIsAnimating, updateSelectedCards } from "@/redux/cardGameSlice"
import { useHover } from "usehooks-ts"
import { increaseFlips } from "@/redux/cardGameSlice"
import { clickMemeSounds, clickNormalSounds } from "@/data/Sound"
import { useLocalStorage } from "usehooks-ts"

export default function Card({ src, name, order, id }: { src: any, name: string, order: number, id: number }) {
  const [statusCard, setStatusCard] = useState<"idle" | "active" | "disabled">("idle")
  const cardGameState = useSelector((state: RootState) => state.cardGame)
  const dispatch = useDispatch<AppDispatch>()
  const hoverRef = useRef<HTMLDivElement>(null)
  const isHover = useHover(hoverRef)
  const [memeSounds, setMemeSounds] = useLocalStorage("memeSounds", true)
  const [normalSounds, setNormalSounds] = useLocalStorage("normalSounds", true)

  // set status the card
  useEffect(() => {
    if (cardGameState.selectedCards.some(card => card.id === id) && cardGameState.activeCards.some(card => card.id === id) && !cardGameState.disabledCards.some(card => card.id === id)) {
      setStatusCard("active")
    } else if (!cardGameState.selectedCards.some(card => card.id === id) && cardGameState.activeCards.some(card => card.id === id) && !cardGameState.disabledCards.some(card => card.id === id)) {
      setStatusCard("idle")
    } else if (!cardGameState.selectedCards.some(card => card.id === id) && !cardGameState.activeCards.some(card => card.id === id) && cardGameState.disabledCards.some(card => card.id === id)) {
      setTimeout(() => {
        setStatusCard("disabled")
      }, 200)
    }
  }, [cardGameState.activeCards, cardGameState.disabledCards, cardGameState.selectedCards, id])

  const clickSounds = useMemo(() => {
    let sounds: string[] = []
    if (memeSounds) {
      return clickMemeSounds
    }
    if (normalSounds) {
      return clickNormalSounds
    }
    return sounds
  }, [memeSounds, normalSounds])

  const disabledVariants: Variants = {
    start: { rotate: [-24, 24], transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "linear" } },
    normal: { rotate: 0 }
  }
  const backCardVariants: Variants = {
    hidden: { rotateY: 0, transition: { type: "tween", duration: 0.2 } },
    show: { rotateY: 90, transition: { type: "tween", duration: 0.2 } }
  }
  const frontCardVariants: Variants = {
    hidden: { rotateY: 90, transition: { type: "tween", duration: 0.2 } },
    show: { rotateY: 180, transition: { type: "tween", duration: 0.2 } },
  }

  return (
    <>
      {/* click card sound */}
      <motion.div
        ref={hoverRef}
        style={{ position: "relative", order: order, maxWidth: "fit-content", margin: "auto" }}
        initial="hidden"
        animate={statusCard === "idle" ? "hidden" : "show"}
        transition={{ staggerChildren: 0.2, staggerDirection: statusCard === "active" ? 1 : -1 }}
        onClick={() => {
          if (!cardGameState.isAnimating) {
            dispatch(updateSelectedCards({ id, name }))
            dispatch(increaseFlips())
            const audio = new Audio(clickSounds[0])
            audio.play()
          }
        }}
        onAnimationStart={() => dispatch(toggleIsAnimating(true))}
        onAnimationComplete={() => dispatch(toggleIsAnimating(false))}
        data-status={statusCard}
        data-role={name}
        data-test="card"
      >
        {/* not flip card */}
        <motion.div
          className={styles.card}
          variants={backCardVariants}
        >
          <Image
            src={web}
            alt="web"
            quality={100}
            className={styles.web}
            style={{ top: 0, left: 0, transform: "rotateY(180deg)" }}
          />
          <Image
            src={web}
            alt="web"
            quality={100}
            className={styles.web}
            style={{ top: 0, right: 0 }}
          />
          <Image
            src={web}
            alt="web"
            quality={100}
            className={styles.web}
            style={{ bottom: 0, left: 0, transform: "rotate3d(1, 1, 0, 180deg)" }}
          />
          <Image
            src={web}
            alt="web"
            quality={100}
            className={styles.web}
            style={{ bottom: 0, right: 0, transform: "rotateX(180deg)" }}
          />
          {/* spider */}
          <motion.div
            animate={isHover ? { y: -8 } : { y: -18 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <Image
              src={spider}
              alt="spider"
              quality={100}
              className={styles.spider}
            />
          </motion.div>
        </motion.div>
        {/* flip card */}
        <motion.div
          className={styles.cardFlip}
          variants={frontCardVariants}
        >
          <Image
            src={webGray}
            alt="web"
            quality={100}
            className={styles.webGray}
            style={{ top: 0, left: 0, transform: "rotateY(180deg)" }}
          />
          <Image
            src={webGray}
            alt="web"
            quality={100}
            className={styles.webGray}
            style={{ top: 0, right: 0 }}
          />
          <Image
            src={webGray}
            alt="web"
            quality={100}
            className={styles.webGray}
            style={{ bottom: 0, left: 0, transform: "rotate3d(1, 1, 0, 180deg)" }}
          />
          <Image
            src={webGray}
            alt="web"
            quality={100}
            className={styles.webGray}
            style={{ bottom: 0, right: 0, transform: "rotateX(180deg)" }}
          />
          {/* icon */}
          <motion.div
            animate={isHover ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              animate={statusCard === "disabled" ? "start" : "normal"}
              variants={disabledVariants}
            >
              <Image
                src={src}
                alt={name}
                quality={100}
                className={name === "bat" ? styles.bat : styles.icon}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}