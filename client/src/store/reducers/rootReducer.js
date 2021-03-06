import {combineReducers} from "redux";
import sheetReducer from "./sheetReducer";
import displayReducer from "./displayReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import focusReducer from "./focusReducer";
import borderReducer from "./borderReducer";
import tableReducer from "./tableReducer";
import shortcutReducer from "./shortcutReducer";
import scrollReducer from "./scrollReducer";

const rootReducer = combineReducers({
    sheet: sheetReducer,
    display: displayReducer,
    scroll: scrollReducer,
    border: borderReducer,
    table: tableReducer,
    focus: focusReducer,
    shortcut: shortcutReducer,
    error: errorReducer,
    auth: authReducer
})

export default rootReducer;