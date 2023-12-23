import styles from "./Victory.module.scss"
import Modal from "../Modal/Modal"

export default function Victory({ handleOnClick }: { handleOnClick: () => void }) {
  return (
    <Modal
      status="victory"
      handleOnClick={handleOnClick}
      h2="VICTORY"
      h3="Click To Restart"
    />
  )
}