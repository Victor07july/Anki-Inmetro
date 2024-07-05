import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddCard({ decks, onAddCard }) {
  const [deck, setDeck] = useState('');
  const [deckList, setDeckList] = useState([]);
  const token = window.localStorage.getItem("token");
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
   const [message, setMessage] = useState(
    "Nada ainda, selecione o deck e escolha a frente e o verso do card!"
  );
  const [isLoading, setLoading] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const handleDeckList = async () => {
      try {
        const response = await axios.get("https://api-anki-inmetro.vercel.app/api/deck/get-deck", { headers: { Authorization: `Bearer ${token}` } });
        const { decks: d } = response.data;
        setDeckList(d);
      } catch(err) {
        console.error(err.response.statusText);
        setMessage(err.response.statusText);
      }
    }
    handleDeckList();
  }, [token]);

  useEffect(() => {
  if (deckList.length > 0) {
    setDeck(deckList[0].filename);
  }
}, [deckList]);

  const handleFrontChange = (event) => {
    const { value } = event.target;
    if (value.length <= 150) {
      setFront(value);
    }
  };

  const handleBackChange = (event) => {
    const { value } = event.target;
    if (value.length <= 150) {
      setBack(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post("https://api-anki-inmetro.vercel.app/api/deck/create-card", { deckName: deck, frontCard: front, backCard: back }, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } } );

      console.log(response.data.success);

      setMessage(response.data.success);
      setLoading(false);
    } catch(err) {
      setMessage(err.response.statusText);
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Deck:
          <select value={deck} onChange={(e) => { setDeck(e.target.value) }}>
            {deckList.map((deck, index) => (
              <option key={index} value={deck.filename}>
                {deck.filename}
              </option>
            ))}
          </select>
        </label>
        <label>
          Front:
          <input
            type="text"
            value={front}
            onChange={handleFrontChange}
            placeholder="Frente do Card (máx. 150 caracteres)"
            required
          />
        </label>
        <label>
          Back:
          <input
            type="text"
            value={back}
            onChange={handleBackChange}
            placeholder="Verso do Card (máx. 150 caracteres)"
            required
          />
        </label>
        <button type="submit">Add Card</button>
      </form>
      <section>
        <p>Mensagem: {isLoading ? "Carregando..." : message}</p>
      </section>
      <button onClick={() => setTimeout(navigate(-1), 3000)}>Voltar</button>
    </div>
  );
}

export default AddCard;
