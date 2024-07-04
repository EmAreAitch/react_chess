import { Typography, Box, Paper, Divider, Stack, Avatar, IconButton, useMediaQuery } from "@mui/material";
import { useState } from "react";
import HandshakeIcon from '@mui/icons-material/Handshake';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';

export default function GameDetails({ roomCode, playerName, playerColor, opponentName, gameStarted, playerTurn }) {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));    
    const opponnetColor = () => {
        return ({
            white: 'black',
            black: 'white',
        })[playerColor]
    }

    const getDivider = () => {
        return isSmallScreen ? <Divider flexItem/> : <Divider orientation="vertical" flexItem />
    }

    const roomInfo = () => {
        switch (roomCode) {
            case '000001':
                return "Difficulty: Easy"                
            case '000002':
                return "Difficulty: Normal"                
            case '000003':
                return "Difficulty: Hard"            
            default:
                return `Room Code: ${roomCode}`                
        }
    }
    return <Box display='flex' justifyContent='center' alignItems='start' padding={2} width='100%'>
        <Paper variant='outlined' sx={{ paddingX: 2, paddingY: 1, display: 'flex', gap: 2, width: {xs: '90%', sm: 'auto'}, justifyContent: 'center' }}>
            <Stack direction={{xs:'column', sm:'row'}} alignItems={'center'} spacing={1} divider={getDivider()}>
                <Stack direction={'row'} justifyContent={'center'} spacing={2} alignContent={'center'}>
                    <Stack alignItems={'center'} spacing={1}>
                        <IconButton aria-label="delete" color="primary" size="small" sx={{ bgcolor: '#af52bf' }} disabled={!gameStarted}>
                            <HandshakeIcon />
                        </IconButton>
                        <Typography variant="caption">Offer Draw</Typography>
                    </Stack>
                    <Stack alignItems={'center'} spacing={1}>
                        <IconButton aria-label="delete" color="primary" size="small" sx={{ bgcolor: '#af52bf' }} disabled={!gameStarted}>
                            <EmojiFlagsIcon />
                        </IconButton>
                        <Typography variant="caption">Resign</Typography>
                    </Stack>
                </Stack>
                <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
                    <Stack spacing={1} alignItems={'center'} justifyContent={'center'} direction={'row-reverse'}>
                        <Avatar sx={{ bgcolor: '#dadada' }} src={`${playerColor}.svg`} className={playerTurn ? "glow-animation" : ""} />
                        <Typography variant='caption' textAlign={'center'} width={70}>{playerName}</Typography>
                    </Stack>
                    <Typography variant="body2" textAlign={'center'}>VS</Typography>
                    <Stack spacing={1} alignItems={'center'} justifyContent={'center'} direction={'row'}>
                        <Avatar sx={{ bgcolor: '#dadada' }} src={`${opponnetColor()}.svg`} className={playerTurn ? "" : "glow-animation"}/>
                        <Typography variant='caption' textAlign={'center'} width={70}>{opponentName || "Waiting..."}</Typography>
                    </Stack>
                </Stack>
                <Stack spacing={1}>
                    <Typography variant="body" textAlign={'center'}>{roomInfo()}</Typography>
                </Stack>

            </Stack>

        </Paper>
    </Box>
}