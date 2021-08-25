import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { useNavDispatch, useNavState } from '../contexts/NavContext';

const containerStyle = {
  position: 'absolute',
  overflow: 'hidden',
  width: '100vw',
  height: '100vh',
};

export default function PageSwitcher({ children }) {
  const state = useNavState();
  const dispatch = useNavDispatch();

  const history = useHistory();

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => history.push(state.path), 500);
      setTimeout(() => dispatch({ type: 'COMPLETE' }), 1000);
    }
  }, [state, dispatch, history]);

  const animLeft = useSpring({
    config: { duration: 500 },
    right: state.loading ? '0%' : '-50vw',
  });
  const animRight = useSpring({
    config: { duration: 500 },
    left: state.loading ? '0%' : '-50vw',
  });

  return (
    <div style={containerStyle}>
      <Door animStyle={animLeft} />
      <Door animStyle={animRight} />
      {children}
    </div>
  );
}

const doorStyle = {
  position: 'absolute',
  width: '50vw',
  height: '100vh',
  backgroundColor: 'black',
  zIndex: 10,
};

const Door = ({ animStyle, restStyle }) => (
  <animated.div
    style={{ ...doorStyle, ...animStyle, ...restStyle }}
  ></animated.div>
);
