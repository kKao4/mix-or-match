import bat from "@/assets/Bat.png";
import bones from "@/assets/Bones.png";
import cauldron from "@/assets/Cauldron.png";
import dracula from "@/assets/Dracula.png";
import eye from "@/assets/Eye.png";
import ghost from "@/assets/Ghost.png";
import pumpkin from "@/assets/Pumpkin.png";
import skull from "@/assets/Skull.png";
import joker from "@/assets/joker-icon.png";
import { StaticImageData } from "next/image";

export interface Card {
  id: number;
  name: string;
  src: StaticImageData;
}

const array1: Card[] = [
  {
    id: 1,
    name: "bat",
    src: bat,
  },
  {
    id: 2,
    name: "bones",
    src: bones,
  },
  {
    id: 3,
    name: "cauldron",
    src: cauldron,
  },
  {
    id: 4,
    name: "dracula",
    src: dracula,
  },
  {
    id: 5,
    name: "eye",
    src: eye,
  },
  {
    id: 6,
    name: "ghost",
    src: ghost,
  },
  {
    id: 7,
    name: "pumpkin",
    src: pumpkin,
  },
  {
    id: 8,
    name: "skull",
    src: skull,
  },
  {
    id: 9,
    name: "joker",
    src: joker,
  },
];

const array2: Card[] = array1.map((card) => {
  return { ...card, id: card.id + array1.length };
});

export const cards: Card[] = [...array1, ...array2];

export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
