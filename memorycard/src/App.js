import './App.css';
import { useState } from 'react';

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
    shuffle(shuffleCards);
    setcards(shuffledCards);
    setturns(0);
  };

  console.log(cards, turns);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
    </div>
  );
}

export default App;
