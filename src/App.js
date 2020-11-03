import React, { useEffect, useState } from "react";

import api from './services/api';
import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res =>  setRepositories(res.data));
  },[])

  async function handleAddRepository() {
    const repository = {
      title: 'ReactJS',
      url: 'https://github.com/CamilaQueiroz/gostack-desafio-3',
      techs: ['JS', 'React']
    }

    await api.post('repositories', repository).then(res => setRepositories([...repositories, res.data]));
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repo => repo.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
