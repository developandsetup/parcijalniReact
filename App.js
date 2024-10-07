import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Dohvaćanje podataka o korisniku
      const userResponse = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(userResponse.data);

      // Dohvaćanje repozitorija korisnika
      const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
      setRepos(reposResponse.data);
    } catch (err) {
      setError('Korisnik nije pronađen ili postoji greška pri dohvaćanju podataka.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>GitHub username</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. facebook"
          value={username}
          onChange={handleInputChange}
          style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', fontSize: '16px' }}>Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userData && (
        <div style={{ marginTop: '20px' }}>
          <h2>{userData.name}</h2>
          <img src={userData.avatar_url} alt="avatar" style={{ width: '150px', borderRadius: '50%' }} />
          <p>{userData.bio}</p>
          <p><strong>Followers:</strong> {userData.followers} | <strong>Following:</strong> {userData.following}</p>
          <p><strong>Public Repositories:</strong> {userData.public_repos}</p>

          <h3>Repositories:</h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {repos.map(repo => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
