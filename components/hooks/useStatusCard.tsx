import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function useStatusCard({ id }: { id: number }) {
  const cardGameState = useSelector((state: RootState) => state.cardGame)
  const [statusCard, setStatusCard] = useState<"idle" | "active" | "disabled">("idle")
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
  return statusCard;
}