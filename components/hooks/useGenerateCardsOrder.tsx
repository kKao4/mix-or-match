import { cards, shuffleArray } from "@/data/Cards"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export function useGenerateCardsOrder(): [number[] | undefined, Dispatch<SetStateAction<number[] | undefined>>] {
  const [order, setOrder] = useState<number[]>()
  useEffect(() => {
    setOrder(shuffleArray(Array.from({ length: cards.length }, (_, i) => i + 1)))
  }, [])
  return [order, setOrder];
}