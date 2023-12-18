import { toggleStatusGame } from "@/redux/globalSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

export function useGameOver({ count }: { count: number }) {
  const dispatch = useDispatch<AppDispatch>()
  const cardGameState = useSelector((state: RootState) => state.cardGame)
  useEffect(() => {
    if (count === 0 && cardGameState.activeCards.length > 0) {
      dispatch(toggleStatusGame("lose"))
    }
  }, [cardGameState.activeCards.length, count, dispatch])
}