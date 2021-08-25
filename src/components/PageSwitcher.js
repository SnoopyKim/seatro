import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { useNav } from '../contexts/NavContext';

const containerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  overflow: 'hidden',
  width: '100vw',
  height: '100vh',
};

export default function PageSwitcher({ children }) {
  const [state, dispatch] = useNav();

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
  top: 0,
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
