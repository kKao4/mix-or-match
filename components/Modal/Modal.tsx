import styles from "./Modal.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { AppDispatch, RootState } from "@/redux/store"
import { toggleStatusGame } from "@/redux/globalSlice"

const modalTextVariants: Variants = {
  hidden: { scale: 0.4, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring", duration: 1.4, delay: 0.2, bounce: 0.28 } },
  exit: { opacity: 0, transition: { duration: 0.4 } }
}

const modalVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.4 } },
  show: { opacity: 1, transition: { duration: 0.4 } }
}

export default function Modal({ handleOnClick, status, h2, h3 }: { handleOnClick?: () => void, status: typeof globalState["status"], h2: string, h3?: string }) {
  const globalState = useSelector((state: RootState) => state.global)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <AnimatePresence>
      {globalState.status === status && (
        <motion.div
          className={styles.container}
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={modalVariants}
          onClick={() => {
            dispatch(toggleStatusGame("play"))
            if (handleOnClick) {
              handleOnClick()
            }
          }}
          data-test={status === "idle" ? "click-to-start" : status === "lose" ? "game-over" : status === "victory" ? "victory" : ""}
        >
          <motion.div
            initial="hidden"
            animate="show"
            exit="exit"
            variants={modalTextVariants}
            className={styles.h2}>
            {h2}
          </motion.div>
          {h3 && (
            <motion.div
              initial="hidden"
              animate="show"
              exit="exit"
              variants={modalTextVariants}
              className={styles.h3}
            >
              {h3}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}