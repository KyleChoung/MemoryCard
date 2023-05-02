import './App.css';
import { useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
  { src: '/img/helmet-1.png' },
  { src: '/img/potion-1.png' },
  { src: '/img/ring-1.png' },
  { src: '/img/scroll-1.png' },
  { src: '/img/shield-1.png' },
  { src: '/img/sword-1.png' },
];

function App() {
  const [cards, setcards] = useState([]);
  const [turns, setturns] = useState(0);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);

  //fisher yates
  function shuffle(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      const rand = Math.floor(Math.random() * (n - i)) + i;
      [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
  }

  const handleChoice = (card) => {
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card);
  };

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages].map((card) => ({
      ...card,
      id: Math.random(),
    }));
    shuffle(shuffledCards);
    setcards(shuffledCards);
    setturns(0);
  };

  console.log(cards, turns);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
}

export default App;
