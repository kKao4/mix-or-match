import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { toggleStatusGame } from "@/redux/globalSlice"

export function useVictory({ count, stopCountdown }: { count: number, stopCountdown: () => void }) {
  const dispatch = useDispatch<AppDispatch>()
  const cardGameState = useSelector((state: RootState) => state.cardGame)
  useEffect(() => {
    if (count > 0 && cardGameState.activeCards.length === 0) {
      dispatch(toggleStatusGame("victory"))
      stopCountdown()
    }
  }, [cardGameState.activeCards.length, count, dispatch, stopCountdown])
}