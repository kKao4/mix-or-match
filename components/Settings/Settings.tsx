import styles from "./Settings.module.scss"
import { Variants, motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useHover } from "usehooks-ts"
import RowSwitch from "../RowSwitch/RowSwitch"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { toggleIsOpenSettings } from "@/redux/globalSlice"
import { useOnClickOutside } from "usehooks-ts"
import { useLocalStorage } from 'usehooks-ts'
import { useSettingsNotification } from "../hooks/useSettingsNotification"

interface Props { handleOpen: () => void, handleClose: () => void }

export default function Settings({ handleOpen, handleClose }: Props) {
  const hoverRef = useRef<HTMLButtonElement>(null)
  const isHover = useHover(hoverRef)
  const buttonVariants: Variants = {
    normal: { scale: 1 },
    start: { scale: 1.2 }
  }
  const globalState = useSelector((state: RootState) => state.global)
  const dispatch = useDispatch<AppDispatch>()
  const myRef = useRef<HTMLDivElement>(null)
  const [animeSounds, setAnimeSounds] = useLocalStorage("animeSounds", false)
  const [backgroundMusic, setBackgroundMusic] = useLocalStorage("backgroundMusic", true)
  const [normalSounds, setNormalSounds] = useLocalStorage("normalSounds", true)
  const [memeSounds, setMemeSounds] = useLocalStorage("memeSounds", false)
  useOnClickOutside(myRef, () => {
    dispatch(toggleIsOpenSettings(false))
    handleClose()
  })
  const showNotification = useSettingsNotification()
  return (
    <>
      {/* settings button */}
      <motion.button
        ref={hoverRef}
        animate={isHover ? "start" : "normal"}
        variants={buttonVariants}
        className={styles.settingsButton}
        onClick={() => {
          dispatch(toggleIsOpenSettings(true))
          handleOpen()
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" /></svg>
      </motion.button>
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, type: "spring", bounce: 0.4, delay: 4 }}
            exit={{ opacity: 0 }}
            className={styles.notification}
          >
            <p>Tips: Change SFX in settings</p>
            <div className={styles.arrow} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* settings tab */}
      <AnimatePresence>
        {globalState.isOpenSettings && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className={styles.container}
          >
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              <button
                className={styles.xMark}
                onClick={() => {
                  dispatch(toggleIsOpenSettings(false))
                  handleClose()
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
              </button>
            </div>
            <div ref={myRef} className={styles.settingsContainer}>
              <p className={styles.h2}>Settings</p>
              <div className={styles.switchContainer}>
                <div className={styles.leftCol}>
                  <RowSwitch
                    title="Background music"
                    isActive={backgroundMusic}
                    handleOnClick={() => setBackgroundMusic(prevState => !prevState)}
                  />
                  <RowSwitch
                    title="Normal SFX"
                    isActive={normalSounds}
                    handleOnClick={() => setNormalSounds(prevState => !prevState)}
                  />
                </div>
                <div className={styles.rightCol}>
                  <RowSwitch
                    title="Meme SFX"
                    isActive={memeSounds}
                    handleOnClick={() => setMemeSounds(prevState => !prevState)}
                  />
                  <RowSwitch
                    title="Anime SFX"
                    isActive={animeSounds}
                    handleOnClick={() => setAnimeSounds(prevState => !prevState)}
                  />
                </div>
              </div>
            </div>
          </motion.div >
        )}
      </AnimatePresence>
    </>
  )
}