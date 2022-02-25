import { createSlice, configureStore } from '@reduxjs/toolkit'

const itemsSlice = createSlice({
    name: 'selectedItems',
    initialState: {
        itemsSelected: [],
    },
    reducers: {
        updateItemsSelected: (state, action) => {
            const itemm = {
                quantity: 1,
                description: `${action.payload.CName}_${action.payload.WhatsApp}`,
                Kilo: action.payload.kilo,
                amount: action.payload.amount,
              };
              state.itemsSelected.push(itemm)
        },
        removeItemSelected: (state, action) => {
            const itemm = action.payload
            state.itemsSelected = state.itemsSelected.filter((itm) => itm.amount !== itemm)
        }
    }
})

export const { updateItemsSelected, removeItemSelected } = itemsSlice.actions


export default itemsSlice.reducer