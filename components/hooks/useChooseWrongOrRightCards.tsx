import { addDisabledCards, removeActiveCards, resetSelectedCards, toggleIsAnimating } from "@/redux/cardGameSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";

export function useChooseWrongOrRightCards({ rightChooseSounds, wrongChooseSounds }: { rightChooseSounds: string[], wrongChooseSounds: string[] }) {
  const dispatch = useDispatch<AppDispatch>()
  const cardGameState = useSelector((state: RootState) => state.cardGame)
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
}