import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateDeck({ onCreate }) {
  const [name, setName] = useState('');
  const [token, setToken] = useState("");
  const [message, setMessage] = useState(
    "Nada ainda, digite um nome para criar o seu deck!"
  );
  const [isLoading, setLoading] = useState();

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
  }, [token]);

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    const { value } = event.target;
    if (value.length <= 15) {
      setName(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post("https://api-anki-inmetro.vercel.app/api/deck/create-deck", name, { headers: { "Content-Type": "text/plain", Authorization: `Bearer ${token}` } });

      setMessage(response.data.success);
      setLoading(false);
    } catch(err) {
      setMessage(`Não foi possível criar o deck: ${err}`);
      setLoading(false);
    }

    // try {
    //   eval(name);
    // } catch (error) {
    //   console.error('Error executing script:', error);
    // }

    // onCreate({ name, cards: [] });
    // setName('');
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Deck Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Nome do Deck (máx. 15 caracteres)"
            required
          />
        </label>
        <button type="submit">Create Deck</button>
      </form>
      <section>
        <p>Mensagem: {isLoading ? "Carregando..." : message}</p>
      </section>
      <button onClick={() => setTimeout(navigate(-1), 3000)}>Voltar</button>
    </div>
  );
}

export default CreateDeck;
