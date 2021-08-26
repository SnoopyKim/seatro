import React from 'react';

function PopularView({ station }) {
  const { station_name, line_number, time, people } = station;
  if (!station_name) return null;
  return (
    <div style={{ backgroundColor: 'white' }}>
      <p>
        <b>
          {line_number} {station_name}
        </b>{' '}
        {time} {people}
      </p>
    </div>
  );
}

export default PopularView;
