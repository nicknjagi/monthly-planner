import { createSlice} from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { getCurrentWeekInMonth } from "../utils";


export type DateState = {
  currentWeek: number;
  currentMonth: number;
}

const initialState: DateState = {
  currentWeek: getCurrentWeekInMonth(new Date().getMonth()),
  currentMonth: new Date().getMonth()
}

const dateSlice = createSlice({
  name:'date',
  initialState,
  reducers:{
    next: (state) => {
      if(state.currentMonth < 11){
        state.currentMonth += 1
      }
    },
    prev: (state) => {
      if(state.currentMonth > 0){
        state.currentMonth -= 1
      }
    },
  }
})

export const {next, prev} = dateSlice.actions

export default dateSlice.reducer