// App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateDeck from './Components/Pages/CreateDeck';
import AddCard from './Components/Pages/AddCard';
import ReadDeck from './Components/Pages/ReadDeck';
import HomePage from './Components/Pages/HomePage';
import Login from './Components/Login/Login';
import Deck from './Components/Deck/Deck';
import './App.css';

function App() {
  const [decks, setDecks] = useState([]);

  const handleCreateDeck = (deck) => {
    setDecks((prevDecks) => [...prevDecks, deck]);
  };

  const handleAddCard = (deckName, card) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) =>
        deck.name === deckName
          ? { ...deck, cards: [...deck.cards, card] }
          : deck,
      ),
    );
  };

  return (
    <div className="container">
      <BrowserRouter>
        <main className="login form">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="login/*" element={<Login />} />
            <Route
              path="createdeck/*"
              element={<CreateDeck onCreate={handleCreateDeck} />}
            />
            <Route
              path="addcard/*"
              element={<AddCard decks={decks} onAddCard={handleAddCard} />}
            />
            <Route path="readdeck/*" element={<ReadDeck decks={decks} />} />
          </Routes>
          {decks.map((deck, index) => (
            <Deck key={index} deck={deck} />
          ))}
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
