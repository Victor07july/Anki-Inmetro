// Em StatisticsPage.jsx
import React, { useContext } from 'react';
import { UserContext } from '../../UserContext'; // Ajuste o caminho conforme necessário
import { useEffect, useState } from 'react';
import axios from 'axios';

const ImportApkgPage = () => {
  const [token, setToken] = useState("");
  const [apkgFile, setApkgFile] = useState();
  const [message, setMessage] = useState(
    "Nada ainda, selecione um arquivo .apkg para importar!"
  );

  const [isLoading, setLoading] = useState();

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
  }, [token]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setApkgFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("apkg-file", apkgFile);

    try {
      const response = await axios.post("https://api-anki-inmetro.vercel.app/api/apkg/import", formData, { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } });

      console.log(`${formData}\n${response}`)

      setMessage(response.data.success);
      setLoading(false);
    } catch(err) {
      setMessage(`Não foi possível importar o deck: ${err}`);
      setLoading(false);
    }
  }

  return (
    <div>
      <section>
        <label>Arquivo .apkg:</label>
        <input
          onChange={handleFileChange}
          type="file"
          accept=".apkg"
        />
      </section>
      <section>
        <button
          onClick={handleSubmit}
        >
          Enviar
        </button>
      </section>
      <section>
        <p>Mensagem: {isLoading ? "Carregando..." : message}</p>
      </section>
    </div>
  );
};

export default ImportApkgPage;