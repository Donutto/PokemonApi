import './App.css';
import ApiPoke from './ApiPoke';
import React, { useState } from "react";

function App() {
  const [showApiPoke, setShowApiPoke] = useState(false);

  const handleButtonClick = () => {
    setShowApiPoke(true);
  };
  return (
    <div className="App">
      <button onClick={handleButtonClick}>
        Get pokemon dex
      </button>
      {showApiPoke && <ApiPoke />}
    </div>
  );
}

export default App;
