import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateDeck from './Components/Pages/CreateDeck';
import AddCard from './Components/Pages/AddCard';
import ReadDeck from './Components/Pages/ReadDeck';
import HomePage from './Components/Pages/HomePage';
import Login from './Components/Login/Login';
import Menu from './Components/Menu/Menu'; // Importe o componente Menu
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { UserStorage } from './UserContext';
import User from './Components/User/User';
import EditDeck from './Components/Pages/EditDeck';
import ProtectedRoute from './Components/Helper/ProtectedRoute';
import StatisticsPage from './Components/Pages/StatisticsPage';
import ImportApkgPage from './Components/Pages/ImportApkg';


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

  const handleDeleteCard = (deckName, cardId) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) =>
        deck.name === deckName
          ? { ...deck, cards: deck.cards.filter((card) => card.id !== cardId) }
          : deck,
      ),
    );
  };

  const handleUpdateCard = (deckName, updatedCard) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) =>
        deck.name === deckName
          ? {
              ...deck,
              cards: deck.cards.map((card) =>
                card.id === updatedCard.id ? updatedCard : card,
              ),
            }
          : deck,
      ),
    );
  };

  const handleDeleteDeck = (deckName) => {
    setDecks((prevDecks) => prevDecks.filter((deck) => deck.name !== deckName));
  };

  const handleUpdateDeck = (updatedDeck) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) =>
        deck.name === updatedDeck.name ? updatedDeck : deck,
      ),
    );
  };

  return (
    <div>
      <BrowserRouter>
        <UserStorage>
            <Header />
            <div className="container flex-container content">
            <Menu /> {/* Adiciona o menu de navegação */}
              <main className="login form">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="login/*" element={<Login />} />
                  <Route 
                  path="editdeck/*" 
                  element={<EditDeck 
                    decks={decks}
                    onDeleteCard={handleDeleteCard}
                    onUpdateCard={handleUpdateCard}
                    onDeleteDeck={handleDeleteDeck}
                    onUpdateDeck={handleUpdateDeck}
                  />} />
                  <Route path="conta/*" element={<ProtectedRoute> <User /></ProtectedRoute>}/>
                  <Route
                    path="createdeck/*"
                    element={<CreateDeck onCreate={handleCreateDeck} />}
                  />
                  <Route
                    path="addcard/*"
                    element={<AddCard decks={decks} onAddCard={handleAddCard} />}
                  />
                  <Route
                path="readdeck/*"
                element={
                  <ReadDeck
                    decks={decks}
                    onDeleteCard={handleDeleteCard}
                    onUpdateCard={handleUpdateCard}
                    onDeleteDeck={handleDeleteDeck}
                    onUpdateDeck={handleUpdateDeck}
                  />
                }
              />

              <Route path="/statistics" element={<StatisticsPage />} />

              <Route path="/import-apkg" element={<ImportApkgPage />} />

            </Routes>
          </main>
            <Footer /> 
            </div>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;