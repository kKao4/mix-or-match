import { cards } from "@/data/Cards";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CardGameState {
  selectedCards: { id: number; name: string }[];
  activeCards: { id: number; name: string }[];
  disabledCards: { id: number; name: string }[];
  flips: number;
  isAnimating: boolean;
}

const initialState: CardGameState = {
  selectedCards: [],
  activeCards: cards.map((card) => {
    return { id: card.id, name: card.name };
  }),
  disabledCards: [],
  flips: 0,
  isAnimating: false,
};

export const cardGameSlice = createSlice({
  name: "cardGame",
  initialState,
  reducers: {
    updateSelectedCards: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      if (!state.selectedCards.some((card) => card.id === action.payload.id)) {
        if (state.selectedCards.length < 2) {
          state.selectedCards.push(action.payload);
        } else {
          state.selectedCards = [action.payload];
        }
      } else {
        state.selectedCards = state.selectedCards.filter((card) => {
          return card.id !== action.payload.id;
        });
      }
    },
    addDisabledCards: (
      state,
      action: PayloadAction<{ id: number; name: string }[]>
    ) => {
      if (action.payload.length === 2) {
        state.disabledCards = [...state.disabledCards, ...action.payload];
      }
    },
    removeActiveCards: (
      state,
      action: PayloadAction<{ id: number; name: string }[]>
    ) => {
      if (action.payload.length === 2) {
        state.activeCards = state.activeCards.filter(
          (card) =>
            card.id !== action.payload[0].id && card.id !== action.payload[1].id
        );
      }
    },
    resetSelectedCards: (state) => {
      state.selectedCards = [];
    },
    toggleIsAnimating: (state, action: PayloadAction<boolean>) => {
      state.isAnimating = action.payload;
    },
    restartCardGame: (state) => {
      Object.assign(state, initialState);
    },
    increaseFlips: (state) => {
      state.flips += 1;
    },
  },
});

export const {
  updateSelectedCards,
  removeActiveCards,
  addDisabledCards,
  resetSelectedCards,
  toggleIsAnimating,
  restartCardGame,
  increaseFlips,
} = cardGameSlice.actions;

export default cardGameSlice.reducer;
