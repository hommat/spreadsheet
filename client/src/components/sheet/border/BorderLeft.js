import React from "react";
import BorderLeftElement from "./BorderLeftElement";
import {connect} from "react-redux";
import {CORNER_SIZE, TOOLBAR_HEIGHT} from "../../../config";

const BorderLeft = ({startRow, endRow, borderHeigts, scrollX, focusedTableCells}) => {
    const focusedRows = focusedTableCells.map(cell => cell.row);
    const elements = [];
    let startMouseY = CORNER_SIZE + TOOLBAR_HEIGHT;
    for(let row = startRow; row < endRow; row++){
        const elementHeight = borderHeigts[row];
        elements.push(<BorderLeftElement
            height={elementHeight}
            startMouseY={startMouseY}
            index={row} 
            key={row}
            isFocused={focusedRows.includes(row)}
        />)
        startMouseY += elementHeight;
    }
    return (
        <div className="border-left" style={{
            top: CORNER_SIZE,
            left: scrollX
        }}>
            {elements}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        borderHeigts: state.border.borderLeft,
        focusedTableCells: state.focus.focusedTableCells
    }
}

export default connect(mapStateToProps)(BorderLeft);


