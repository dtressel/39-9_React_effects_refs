import Card from './Card';
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import './Table.css';

const Table = () => {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [drawAllButtonText, setDrawAllButtonText] = useState('Draw All');
  const drawIntervalId = useRef();

  useEffect(() => {
    async function startDeck() {
      const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      setDeck(res.data.deck_id);
    }
    startDeck();
  }, [setDeck]);

  const drawOneCard = async () => {
    const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
    setCards(oldCards => [
      ...oldCards, 
      {
        ...res.data.cards[0], 
        key: res.data.cards[0].code,
        remaining: res.data.remaining
      }
    ]);
    if (res.data.remaining === 0) {
      setDeck(null);
      stopDrawing();
    }
  }

  const drawAllCards = () => {
    if (drawAllButtonText === 'Stop Drawing') {
      stopDrawing();
    } else {
      drawIntervalId.current = setInterval(async () => {
        await drawOneCard();
      }, 1000);
      setDrawAllButtonText('Stop Drawing');
    }
  }

  const stopDrawing = () => {
    clearInterval(drawIntervalId.current);
    setDrawAllButtonText('Draw All');
  }

  return (
    <div className="Table">
      <div className="Table-button-div">
        {(deck && drawAllButtonText === 'Draw All') && <button onClick={drawOneCard}>Draw One</button>}
        {deck && <button onClick={drawAllCards}>{drawAllButtonText}</button>}
      </div>
      <div className='Table-card-pile-wrapper'>
        <div className="Table-card-pile">
          {cards.map((card) => <Card img={card.image} key={card.key} style={card.style} />)}
        </div>
      </div>
    </div>
  )
}

export default Table;