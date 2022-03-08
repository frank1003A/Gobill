import { configureStore } from '@reduxjs/toolkit'
import wbReducer from './waybillSlice'
import itemsReducer from './ItemsSlice'
import mainWbReducer from './wBSlice'

export default configureStore({
    reducer : {
        itemSelected: wbReducer,
        itemsSelected: itemsReducer,
        wbSelected: mainWbReducer
    },  
})

