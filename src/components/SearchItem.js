import React, { useState } from 'react'

export default function SearchItem({ itemName }) {
    const [focused, setFocused] = useState(false)
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
        <div onFocus={() => console.log('onFocus')} onFocusCapture={() => console.log('onFocusCapture')} onMouseOver={() => setFocused(true)} onMouseLeave={() => setFocused(false)}>
            <span style={{ ...defaultStyle, ...(focused && focusStyle)}}>{itemName}</span>
        </div>
    )
}
