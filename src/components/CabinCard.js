import React from 'react';

function CabinCard({ info }) {
  const { direction, cabin } = info;

  const sum = cabin.reduce((acc, cur) => acc + cur);
  const min = cabin.reduce((acc, cur, i) => (cabin[acc] < cur ? acc : i), 0);
  return (
    <div
      style={{
        width: '600px',
        backgroundColor: '#2e3c7e',
        color: '#fbeaeb',
        borderRadius: '0.5rem',
        padding: '1rem',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: '2rem',
      }}
    >
      <div
        style={{
          width: '360px',
          justifyContent: 'space-between',
        }}
      >
        {cabin.map((it, idx) => {
          const color = it < 5 ? 'green' : it > 10 ? 'red' : 'yellow';
          return (
            <div
              key={`cabin_${direction}_${idx}`}
              style={{
                backgroundColor: color,
                borderRadius: '3px',
                width: '2rem',
                height: '0.7rem',
              }}
            ></div>
          );
        })}
      </div>
      <h1 style={{ textAlign: 'center' }}>
        {sum}명<br />
        {`(${sum > 100 ? '포화' : '여유'})`}
      </h1>
      <hr style={{ width: '200px', border: '0.5px solid #fbeaeb' }} />
      <p>추천 이용 칸</p>
      <strong style={{ marginBottom: '1rem' }}>{min}</strong>
    </div>
  );
}

export default CabinCard;
