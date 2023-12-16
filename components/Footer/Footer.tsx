import styles from "./Footer.module.scss"
import { lunacyFont } from "@/pages/_app"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={styles.footerContainer + " " + lunacyFont.className}
      >
        2023 - The website is made by kKao4
      </motion.div>
    </>
  )
}