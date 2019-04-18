import axios from "axios";
import {SheetActions, ErrorActions} from "./actionTypes";
import {tokenConfig} from "./authActions";
import {getFilledArray, getNestedFilledArray} from "../../helpers/arrayHelpers";
import {DEFAUTLT_CELL_WIDTH, DEFAUTLT_CELL_HEIGHT} from "../../config";

export const getSheets = () => (dispatch, getState) => {
    axios.get("/api/spreadsheet", tokenConfig(getState))
    .then(res => dispatch({
        type: SheetActions.GET_SHEETS,
        payload: res.data
    }))
    .catch(err => dispatch(errorAction(err)));
};

export const getSheetDetail = id => (dispatch, getState) => {
    axios.get(`/api/spreadsheet/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: SheetActions.GET_SHEET_DETAIL,
        payload: res.data
    }))
};

export const createSheet = data => (dispatch, getState) => {
    axios.post("/api/spreadsheet", data, tokenConfig(getState))
    .then(res => dispatch({
        type: SheetActions.CREATE_SHEET,
        payload: res.data
    }))
    .catch(err => dispatch(errorAction(err)));
};

export const updateSheetInfo = (id, data) => (dispatch, getState) => {
    axios.put(`/api/spreadsheet/${id}/update`, data, tokenConfig(getState))
    .then(res => dispatch({
        type: SheetActions.UPDATE_SHEET_INFO,
        payload: { data, _id: id }
    }))
    .catch(err => dispatch(errorAction(err)));
};

export const deleteSheet = id => (dispatch, getState) => {
    axios.delete(`/api/spreadsheet/${id}/delete`, tokenConfig(getState))
    .then(() => dispatch({
        type: SheetActions.DELETE_SHEET,
        payload: id
    }))
    .catch(err => dispatch(errorAction(err)));
};

export const setIsInSheet = isInSheet => {
    return {
        type: SheetActions.SET_IS_IN_SHEET,
        payload: isInSheet
    };
};

export const resizeSheet = (cols, rows) => (dispatch, getState) => {
    const {table, borderTop, borderLeft} = getState().sheet.actualSheet;
    let newTable, newBorderTop, newBorderLeft;
    if(table.length === 0){
        newTable = getNestedFilledArray(rows, cols, "");
        newBorderTop = getFilledArray(cols, DEFAUTLT_CELL_WIDTH);
        newBorderLeft = getFilledArray(rows, DEFAUTLT_CELL_HEIGHT);
    }else{
        const newRows = rows - table.length;
        const newCols = cols - table[0].length;
        newTable = table.map(row => [...row, ...getFilledArray(newCols, "")]);
        newTable = [...newTable, ...getNestedFilledArray(newRows, cols, "")];
        newBorderTop = [...borderTop, ...getFilledArray(newCols, DEFAUTLT_CELL_WIDTH)];
        newBorderLeft = [...borderLeft, ...getFilledArray(newRows, DEFAUTLT_CELL_HEIGHT)];
    }
    dispatch({
        type: SheetActions.RESIZE_SHEET,
        payload: {
            table: newTable,
            borderTop: newBorderTop,
            borderLeft: newBorderLeft
        }
    });
};

export const updateTableCell = (col, row, text) => {
    return {
        type: SheetActions.UPDATE_TABLE_CELL,
        payload: {
            col, row, text
        }
    };
};

export const resizeSheetBorder = (index, size, isCol) => (dispatch, getState) => {
    const newBorder = [...getState().sheet.actualSheet[isCol ? "borderTop" : "borderLeft"]]
    newBorder[index] = size;
    dispatch({
        type: SheetActions.RESIZE_SHEET_BORDER,
        payload: {
            border: newBorder,
            isCol
        }
    });
};

const errorAction = err => {
    return {
        type: ErrorActions.GET_ERRORS,
        payload: {
            messages: err.response.data,
            status: err.response.status
        }
    };
};

