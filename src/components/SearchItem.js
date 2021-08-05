import React, { useEffect, useState } from 'react'

export default function SearchItem({ itemName, focus = false, onHover, onClick }) {
    const defaultStyle = {
        width: '300px',
        color: 'black',
        border: '1px solid black'
    }
    const focusStyle = {
        color: 'white',
        backgroundColor: 'black'
    }

    return (
        <div onMouseOver={onHover} onMouseDown={onClick}>
            <span style={{ ...defaultStyle, ...(focus && focusStyle)}}>{itemName}</span>
        </div>
    )
}
