import { createSlice, configureStore } from '@reduxjs/toolkit'

const WbSlice = createSlice({
  name: 'selectedItem',
  initialState: {
    itemSelected: {},
  },
  reducers: {
    updateItemSelected: (state, action) => {
        const itemm = {
            quantity: 1,
            description: `${action.payload.CName}_${action.payload.WhatsApp}`,
            Kilo: action.payload.kilo,
            amount: action.payload.amount,
          };
          state.itemSelected = itemm
    },
  }
})

export const { updateItemSelected } = WbSlice.actions


export default WbSlice.reducer

/*

const store = configureStore({
  reducer: WbSlice.reducer
})
// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()))

// Still pass action objects to `dispatch`, but they're created for us
store.dispatch(incremented())
// {value: 1}
store.dispatch(incremented())
// {value: 2}
store.dispatch(decremented())
{value: 1}
*/