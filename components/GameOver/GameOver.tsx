import styles from "./GameOver.module.scss"
import Modal from "../Modal/Modal"

export default function GameOver({ handleOnClick }: { handleOnClick: () => void }) {
  return (
    <Modal
      status="lose"
      handleOnClick={handleOnClick}
      h2="GAME OVER"
      h3="Click To Restart"
    />
  )
}