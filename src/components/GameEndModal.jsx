import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

export default function GameEndModal({ result, handlePlayAgain }) {
    const content = {
        winner: {
            title: 'Checkmate!',
            description: 'Congratulations! You have successfully defeated your opponent!',
            borderColor: 'green',
            backgroundColor: 'rgba(144, 238, 144, 0.5)',
        },
        loser: {
            title: 'Game Over!',
            description: 'It was a tough match, but don\'t give up! Practice makes perfect.',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 51, 51, 0.5)',
        },
        stalemate: {
            title: 'Stalemate!',
            description: 'The game ended in a stalemate. Well played!',
            borderColor: 'orange',
            backgroundColor: 'rgba(255, 165, 0, 0.5)',
        },
        player_resign: {
            title: 'Resigned!',
            description: 'You decided to resign. Keep practicing and come back stronger!',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 51, 51, 0.5)',
        },
        opponent_resign: {
            title: 'Opponent Resigned!',
            description: 'Your opponent resigned. Well done on securing the victory!',
            borderColor: 'green',
            backgroundColor: 'rgba(144, 238, 144, 0.5)',
        },
        draw: {
            title: 'Draw!',
            description: 'The game ended in a draw. Well played!',
            borderColor: 'orange',
            backgroundColor: 'rgba(255, 165, 0, 0.5)',
        },
    }[result];

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 4,
        borderColor: content.borderColor,
        borderSize: 2,
        borderStyle: 'solid',
        textAlign: 'center',
    };

    const titleStyle = {
        marginBottom: '16px',
    };

    const descriptionStyle = {
        marginBottom: '24px',
        color: '#555',
    };

    const buttonStyle = {
        padding: '8px 16px',
    };

    return (
        <Modal
            open={true}
            aria-labelledby="game-end-modal-title"
            aria-describedby="game-end-modal-description"
            disableAutoFocus={true}
            sx={{ '& .MuiBackdrop-root': { backgroundColor: content.backgroundColor } }}
        >
            <Box sx={modalStyle}>
                <Typography variant="h5" id="game-end-modal-title" sx={titleStyle}>
                    {content.title}
                </Typography>
                <Typography variant="body1" id="game-end-modal-description" sx={descriptionStyle}>
                    {content.description}
                </Typography>
                <Button variant="contained" sx={buttonStyle} onClick={handlePlayAgain}>
                    Continue
                </Button>
            </Box>
        </Modal>
    );
};
