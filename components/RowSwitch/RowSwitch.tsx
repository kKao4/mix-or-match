import { motion } from "framer-motion";
import styles from "./RowSwitch.module.scss";

export default function RowSwitch({ isActive, handleOnClick, title }: { isActive: boolean, handleOnClick: any, title: string }) {
  return (
    <div className={styles.rowSwitch}>
      <p>{title}</p>
      <motion.div data-active={isActive} className={styles.switch} onClick={handleOnClick}>
        <motion.button
          className={styles.switchButton}
          layout
          transition={{ type: "spring", duration: 0.5, bounce: 0.4 }} />
      </motion.div>
    </div>
  )
}