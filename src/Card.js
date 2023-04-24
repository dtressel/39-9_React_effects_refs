import { useState } from 'react';
import './Card.css';

const Card = ({ img, remaining }) => {
  const [style] = useState({
    zIndex: 52 - remaining,
    transform: `rotate(${Math.floor((Math.random() * 50) - 25)}deg)`,
    top: `${Math.floor(Math.random() * 40)}px`,
    left: `${Math.floor(Math.random() * 40) - 20}px`
  });

  return <img src={img} style={style} className='Card-card' />
}

export default Card;