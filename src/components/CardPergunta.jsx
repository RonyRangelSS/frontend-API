import React from 'react';
import { FaTrash } from 'react-icons/fa';
import './CardPergunta.css';

const CardPergunta = ({ nome, pergunta, resposta, onDelete }) => {
  const handleDeleteClick = () => {
    // Exibe um modal de confirmação padrão do navegador
    const isConfirmed = window.confirm('Deseja realmente excluir esta pergunta?');
    
    if (isConfirmed) {
      // Se confirmado, chama a função onDelete
      onDelete();
    }
  };

  return (
    <div className="card-pergunta">
      <div className="card-header">
        {nome}
        <button className="delete-button" onClick={handleDeleteClick}>
          <FaTrash />
        </button>
      </div>
      <div className="card-body">
        <p className="card-text">{pergunta}</p>
        <p className="card-text resposta">{resposta}</p>
      </div>
    </div>
  );
};

export default CardPergunta;