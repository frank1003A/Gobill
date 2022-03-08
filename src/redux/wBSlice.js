import { createSlice } from '@reduxjs/toolkit'

const mainWbSlice = createSlice({
  name: 'selectedWaybill',
  initialState: {
    wbSelected: {},
  },
  reducers: {
    updateWbSelected: (state, action) => {
        const itmm = action.payload;
          state.wbSelected = itmm
    },
  }
})

export const { updateWbSelected } = mainWbSlice.actions


export default mainWbSlice.reducer