import React, { useEffect, useState } from 'react'
import colors from './../resources/colors';

export default function SearchItem({ data, focus = false, onHover, onClick }) {
    const { station_name, line_number } = data;
    const defaultStyle = {
        width: '300px',
        color: 'black',
        border: '1px solid black'
    }
    const focusStyle = {
        color: 'white',
        backgroundColor: 'black'
    }
    const lineStyle = {
        backgroundColor: colors.metro[line_number]
    }

    return (
        <div style={defaultStyle} onMouseOver={onHover} onMouseDown={onClick}>
            <span style={lineStyle}>{line_number}</span>
            <span style={{...focus && focusStyle}}>{station_name}</span>
        </div>
    )
}
