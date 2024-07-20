import { Typography, Box, Paper, Divider, Stack, Avatar, IconButton, useMediaQuery, Button } from "@mui/material";
import { useState } from "react";
import HandshakeIcon from '@mui/icons-material/Handshake';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';

export default function GameDetails({ roomCode, playerName, playerColor, opponentName, gameStarted, playerTurn, resign, offerDraw }) {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const opponnetColor = () => {
        return ({
            white: 'black',
            black: 'white',
        })[playerColor]
    }

    const getDivider = () => {
        return isSmallScreen ? <Divider flexItem /> : <Divider orientation="vertical" flexItem />
    }

    const isDrawDisabled = () => {
        return !gameStarted || ['000001','000002','000003'].includes(roomCode)
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
        <Paper variant='outlined' sx={{ paddingX: 2, paddingY: 1, display: 'flex', gap: 2, width: { xs: '90%', sm: 'auto' }, justifyContent: 'center' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={'center'} justifyContent={'center'} spacing={1} divider={getDivider()}>
                <Stack direction={'row'} justifyContent={'center'} spacing={2} alignContent={'center'} width={'275px'}>
                    <Button size='small' variant="contained" endIcon={<HandshakeIcon />} disabled={isDrawDisabled()} onClick={offerDraw}>
                        Offer Draw
                    </Button>
                    <Button size='small' variant="contained" endIcon={<EmojiFlagsIcon />} disabled={!gameStarted} onClick={resign}>
                        Resign
                    </Button>                                        
                </Stack>
                <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'} width={'275px'}>
                    <Stack spacing={1} alignItems={'center'} justifyContent={'center'} direction={'row-reverse'}>
                        <Avatar sx={{ bgcolor: '#dadada' }} src={`${playerColor}.svg`} className={playerTurn ? "glow-animation" : ""} />
                        <Typography variant='body2' textAlign={'right'}>{playerName}</Typography>
                    </Stack>
                    <Typography variant="body2" textAlign={'center'}>VS</Typography>
                    <Stack spacing={1} alignItems={'center'} justifyContent={'center'} direction={'row'}>
                        <Avatar sx={{ bgcolor: '#dadada' }} src={`${opponnetColor()}.svg`} className={playerTurn ? "" : "glow-animation"} />
                        <Typography variant='body2' textAlign={'left'}>{opponentName || "Waiting..."}</Typography>
                    </Stack>
                </Stack>
                <Stack spacing={1} width={'275px'}>
                    <Typography variant="body" textAlign={'center'}>{roomInfo()}</Typography>
                </Stack>

            </Stack>

        </Paper>
    </Box>
}