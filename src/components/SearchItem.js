import React from 'react';
import LineBadge from './LineBadge';

export default function SearchItem({ data, focus = false, onHover, onClick }) {
  const { station_name, line_number } = data;
  const defaultStyle = {
    color: 'black',
    marginBottom: '20px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  };
  const focusStyle = {
    borderBottom: '1px solid #111',
    boxSizing: 'border-box',
    paddingBottom: '2px',
    cursor: 'pointer',
  };

  return (
    <div style={defaultStyle} onMouseOver={onHover} onMouseDown={onClick}>
      <LineBadge line_number={line_number} style={{ marginRight: '8px' }} />
      <span style={{ ...(focus && focusStyle) }}>{station_name}</span>
    </div>
  );
}
