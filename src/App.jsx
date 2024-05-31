// App.jsx
import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);

  // Carregar decks do localStorage
  useEffect(() => {
    const savedDecks = JSON.parse(localStorage.getItem('decks'));
    if (savedDecks) {
      setDecks(savedDecks);
    }
  }, []);

  // Salvar decks no localStorage
  useEffect(() => {
    localStorage.setItem('decks', JSON.stringify(decks));
  }, [decks]);

  // Função para criar deck com validação
  const handleCreateDeck = (deck) => {
    setLoading(true);
    if (!deck.name.trim()) {
      alert('O nome do deck não pode ser vazio');
      setLoading(false);
      return;
    }
    if (decks.some((d) => d.name === deck.name)) {
      alert('Já existe um deck com esse nome');
      setLoading(false);
      return;
    }
    setDecks((prevDecks) => [...prevDecks, deck]);
    setLoading(false);
  };

  // Função para adicionar cartão com validação
  const handleAddCard = (deckName, card) => {
    if (!card.question.trim() || !card.answer.trim()) {
      alert('A pergunta e a resposta do cartão não podem ser vazias');
      return;
    }
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
          {loading && <div className="loading">Carregando...</div>}
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
