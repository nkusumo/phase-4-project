import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react';

function App() {

  useEffect(() => {
    fetch("https://api.spotify.com/v1/search?q=cry%20me%20a%20river&type=track&market=US&limit=3", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer BQD9JlFzyPzVyRykcS71gBBpYhKm0xzaMFhZllwfR4TsQ3UhOq7LiOlqqTtXBduZTfPj_3YxNiB7bKKXrjldiFIhlkv2s7noNriBpNuVs2dCzGU4vdJCEVVcAbu2xX3QopRkstyv49so"
      }
    })
    .then(res => res.json())
    .then(data => console.log(data.tracks.items.map(item => item.id)))
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
