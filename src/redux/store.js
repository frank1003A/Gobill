import { configureStore } from '@reduxjs/toolkit'
import wbReducer from './waybillSlice'
import itemsReducer from './ItemsSlice'

export default configureStore({
    reducer : {
        itemSelected: wbReducer,
        itemsSelected: itemsReducer
    },  
})
/**
 * import {createStateSyncMiddleware, initStateWithPrevTab} from "redux-state-sync";
const reduxStateSyncConfig = {};
middleware: [createStateSyncMiddleware()]
initStateWithPrevTab(Store);
 */
