import React, { useState } from 'react';
import NameForm from './components/NameForm';
import Game from './components/Game';
import { Box, Link } from '@mui/material';

function App() {
  const [playerName, setPlayerName] = useState(sessionStorage.getItem('name'));
  return <Box minHeight={'550px'} height={'100vh'} position={'relative'}>
    {playerName == undefined ? (
      <NameForm setPlayerName={setPlayerName} />
    ) : (
      <Game playerName={playerName} resetName={() => setPlayerName(undefined)} />
    )}
    <Link
      variant={'h6'}
      position={'absolute'}
      bottom={10}
      right={10}
      color={'#F0D9B5'}
      boxShadow={'0px 0px 20px 15px black, inset 0px 0px 15px 15px black'}
      fontWeight={1000}
      underline='hover'
      href='https://github.com/EmAreAitch'
      target="_blank"
      rel="noopener"
      >
      By EmAreAitch
    </Link>
  </Box>
}

export default App;
