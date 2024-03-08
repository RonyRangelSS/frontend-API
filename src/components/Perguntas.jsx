import React, { useState, useEffect } from 'react';
import api from '../services/api';
import CardPergunta from './CardPergunta';
import './Perguntas.css';

const Perguntas = () => {
  const [perguntas, setPerguntas] = useState([]);

  useEffect(() => {
    const fetchPerguntas = async () => {
      try {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('idUsuario');
        const response = await api.get(`/quiz/usuario/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPerguntas(response.data);
      } catch (error) {
        console.error('Erro ao recuperar perguntas existentes:', error);
      }
    };

    fetchPerguntas();
  }, []);

  const handleDelete = async (idPergunta) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/quiz/${idPergunta}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Atualize a lista de perguntas após a exclusão
      setPerguntas((prevPerguntas) =>
        prevPerguntas.filter((pergunta) => pergunta.idPergunta !== idPergunta)
      );
    } catch (error) {
      console.error('Erro ao excluir pergunta:', error);
    }
  };

  return (
    <div className="perguntas-existentes">
      <h2>Meus Cartões</h2>
      <div className="cards-container">
        {perguntas.map((pergunta) => (
          <CardPergunta
            key={pergunta.idPergunta}
            nome={pergunta.nome}
            pergunta={pergunta.pergunta}
            resposta={pergunta.resposta}
            onDelete={() => handleDelete(pergunta.idPergunta)}
          />
        ))}
      </div>
    </div>
  );
};

export default Perguntas;