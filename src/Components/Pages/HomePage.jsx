import React from "react";
import { Link } from 'react-router-dom';

// import styles from "./Footer.module.css";

const HomePage = () => {
    return (
        <section>
            <h1>Bem vindo ao Anki-Inmetro!</h1>

            {/* Login está no Header.jsx! */}

            <Link to="/createdeck">
                <input type="button" value="Criar Deck" />
            </Link>

            <Link to="/addcard">
            <input type="button" value="Criar cards" />
            </Link>

            <Link to="/readdeck">
            <input type="button" value="Ler Deck" />
            </Link>

            <Link to="/editdeck">
            <input type="button" value="Editar Deck" />
            </Link>


            <Link to="/statistics">
            <input type="button" value="Estatísticas" />
            </Link>

            <Link to="/import-apkg">
            <input type="button" value="Importar .apkg" />
            </Link>
        </section>
    )

};

export default HomePage;