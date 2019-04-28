import React, {useEffect} from "react";
import {connect} from "react-redux";
import {updateTableCell} from "../../../store/actions/sheetActions";

const Aligment = ({table, actualTableCell, updateTableCell}) => {
    const container = React.createRef();
    const left = React.createRef();
    const center = React.createRef();
    const right = React.createRef();
    
    useEffect(() => {
        if(!actualTableCell || !table[actualTableCell.row]) return;
        if(!table[actualTableCell.row][actualTableCell.col]) return;
        const {align} = table[actualTableCell.row][actualTableCell.col];
        container.current.childNodes.forEach(option => {
            if(option.id !== `align-${align}`) option.classList.remove("selected");
            else option.classList.add("selected");
        });
    }, [actualTableCell])

    const handleClick = ({currentTarget}) => {
        currentTarget.classList.add("selected");
        container.current.childNodes.forEach(option => {
            if(option.id !== currentTarget.id)
            option.classList.remove("selected");
        });
        const align = currentTarget.id.substring(6, currentTarget.id.length);
        updateTableCell({align});
    };

    return (
        <div className="options" ref={container}>
            <div className="option" id="align-left" onClick={handleClick} ref={left}>
                <h4>L</h4>
            </div>
            <div className="option" id="align-center" onClick={handleClick} ref={center}>
                <h4>C</h4>
            </div>
            <div className="option" id="align-right" onClick={handleClick} ref={right}> 
                <h4>R</h4>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        table: state.sheet.actualSheet.table,
        actualTableCell: state.sheet.actualSheet.actualTableCell
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateTableCell: property => dispatch(updateTableCell(null, null, property))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Aligment);