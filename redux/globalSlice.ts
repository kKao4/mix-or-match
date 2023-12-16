import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  isOpenSettings: boolean;
  status: "idle" | "play" | "lose" | "victory";
  // backgroundMusic: boolean;
  // memeSounds: boolean;
  // normalSounds: boolean;
  // animeSounds: boolean;
}

const initialState: GlobalState = {
  isOpenSettings: false,
  status: "idle",
  // backgroundMusic: true,
  // memeSounds: true,
  // normalSounds: true,
  // animeSounds: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleStatusGame: (state, action: PayloadAction<GlobalState["status"]>) => {
      state.status = action.payload;
    },
    toggleIsOpenSettings: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.isOpenSettings = action.payload ?? !state.isOpenSettings;
    },
    // toggleBackgroundMusic: (state) => {
    //   state.backgroundMusic = !state.backgroundMusic;
    // },
    // toggleMemeSounds: (state, action: PayloadAction<boolean | undefined>) => {
    //   state.memeSounds = action.payload ?? !state.memeSounds;
    // },
    // toggleNormalSounds: (state, action: PayloadAction<boolean | undefined>) => {
    //   state.normalSounds = action.payload ?? !state.normalSounds;
    // },
    // toggleAnimeSounds: (state, action: PayloadAction<boolean | undefined>) => {
    //   state.animeSounds = action.payload ?? !state.animeSounds;
    // },
  },
});

export const {
  toggleStatusGame,
  toggleIsOpenSettings,
  // toggleBackgroundMusic,
  // toggleMemeSounds,
  // toggleNormalSounds,
  // toggleAnimeSounds,
} = globalSlice.actions;

export default globalSlice.reducer;
