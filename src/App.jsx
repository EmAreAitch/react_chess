import React, { useState } from 'react';
import NameForm from './components/NameForm';
import Game from './components/Game';
import { Stack, Link } from '@mui/material';

function App() {
  const [playerName, setPlayerName] = useState(sessionStorage.getItem('name'));
  return <Stack minHeight={'100dvh'} justifyContent={'space-between'} gap={4}>
    {playerName == undefined ? (
      <NameForm setPlayerName={setPlayerName} />
    ) : (
      <Game playerName={playerName} resetName={() => setPlayerName(undefined)} />
    )}
    <Link
      variant={'h6'}      
      color={'#F0D9B5'}
      boxShadow={'0px 0px 20px 15px black, inset 0px 0px 15px 15px black'}
      fontWeight={1000}
      alignSelf={'flex-end'}
      marginBottom={2}
      marginRight={2}
      boxSizing={'border-box'}
      underline='always'
      href='https://github.com/EmAreAitch'
      target="_blank"
      rel="noopener"
      >
      By EmAreAitch
    </Link>
  </Stack>
}

export default App;
