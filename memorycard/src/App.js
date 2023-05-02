import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
  { src: '/img/helmet-1.png', matched: false },
  { src: '/img/potion-1.png', matched: false },
  { src: '/img/ring-1.png', matched: false },
  { src: '/img/scroll-1.png', matched: false },
  { src: '/img/shield-1.png', matched: false },
  { src: '/img/sword-1.png', matched: false },
];

function App() {
  const [cards, setcards] = useState([]);
  const [turns, setturns] = useState(0);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);
  const [disabled, setdisabled] = useState(null);

  //fisher yates
  function shuffle(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      const rand = Math.floor(Math.random() * (n - i)) + i;
      [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
  }

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages].map((card) => ({
      ...card,
      id: Math.random(),
    }));
    setchoiceOne(null);
    setchoiceTwo(null);
    shuffle(shuffledCards);
    setcards(shuffledCards);
    setturns(0);
  };

  const handleChoice = (card) => {
    if (card.id === choiceOne?.id) {
      return;
    }
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card);
  };

  const resetTurn = () => {
    setchoiceOne(null);
    setchoiceTwo(null);
    setturns((prevTurns) => prevTurns + 1);
    setdisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setdisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setcards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>新遊戲</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>回合: {turns}</p>
    </div>
  );
}

export default App;
