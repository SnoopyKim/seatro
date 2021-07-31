import React, { useContext, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

const containerStyle = {
    display: 'block',
    position: 'absolute',
    width: '100vw',
    height: '100vh'
}

export default function PageSwitcher({ status, children }) {
    const animLeft = useSpring({
        config: { duration: 500 },
        right: status ? "0%" : "-50%" 
    })
    const animRight = useSpring({
        config: { duration: 500 },
        left: status ? "0%" : "-50%"
    })

    return (
        <div style={containerStyle}>
            <Door animStyle={animLeft} />
            <Door animStyle={animRight} />
            { children }
        </div>
    )
}

const doorStyle = {
    position: 'absolute',
    width: "50%",
    height: "100%",
    backgroundColor: "black"
}

const Door = ({ animStyle, restStyle }) => (
    <animated.div style={{ ...doorStyle, ...animStyle, ...restStyle}}>

    </animated.div>
)