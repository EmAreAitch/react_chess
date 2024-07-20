import React, { useState } from 'react';
import NameForm from './components/NameForm';
import Game from './components/Game';

function App() {
  const [playerName, setPlayerName] = useState(sessionStorage.getItem('name'));
  return <>
    {playerName == undefined ? (
      <NameForm setPlayerName={setPlayerName} />
    ) : (
      <Game playerName={playerName} resetName={() => setPlayerName(undefined)}/>
    )}
  </>
}

export default App;
