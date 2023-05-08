import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
import Popup from './components/Popup';

const cardImages = [
  { src: '/img/P1.jpg', matched: false },
  { src: '/img/P2.jpg', matched: false },
  { src: '/img/P3.jpg', matched: false },
  { src: '/img/P4.jpg', matched: false },
  { src: '/img/P7.jpg', matched: false },
  { src: '/img/P6.jpg', matched: false },
];

function App() {
  const [cards, setcards] = useState([]);
  const [turns, setturns] = useState(0);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);
  const [disabled, setdisabled] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleChoice = (card) => {
    if (card.id === choiceOne?.id) {
      return;
    } else {
      choiceOne ? setchoiceTwo(card) : setchoiceOne(card);
    }
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

    if (cards.every((x) => x.matched === true)) {
      togglePopup();
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>約克夏記憶卡遊戲</h1>
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

      {isOpen && (
        <Popup
          turns={turns}
          handleClose={togglePopup}
          shuffleCards={shuffleCards}
        />
      )}
    </div>
  );
}

export default App;
