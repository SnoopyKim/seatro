import React from 'react';
import colors from './../resources/colors';

function LineBadge({ line_number, ...props }) {
  const lineStyle = {
    backgroundColor: colors.metro[line_number],
    color: 'white',
    fontSize: '14px',
    padding: '4px 12px',
    borderRadius: '14px',
    display: 'inlime-block',
    textAlign: 'center',
    fontWeight: 'bold',
  };

  return <span style={{ ...lineStyle, ...props.style }}>{line_number}</span>;
}

export default LineBadge;
