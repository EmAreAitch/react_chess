import { useMemo, useRef, useState, useEffect } from "react";
import RoomForm from "./RoomForm";
import { Chessboard } from "react-chessboard";
import { Box, Snackbar, useMediaQuery, Button, Stack } from "@mui/material";
import { createConsumer } from "@rails/actioncable";
import GameDetails from "./GameDetails";
import GameEndModal from "./GameEndModal";
import { useImmerReducer } from "use-immer";
import gameReducer from "../reducers/GameReducer";

export default function Game({ playerName, resetName }) {
    const [gameState, dispatch] = useImmerReducer(gameReducer, {
        roomCode: null,
        roomJoined: false,
        gameStarted: false,
        result: undefined,
        opponentName: undefined,
        fen: 'start',
        playerColor: 'white',
        snackbarOpen: false,
        playerTurn: false
    })

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const consumer = useRef(null)
    const cable = useRef(undefined);
    const positionObj = useRef(undefined)
    const { roomCode, roomJoined, gameStarted, result, opponentName, fen, playerColor, snackbarOpen, playerTurn } = gameState
    const connectionHandler = {
        received: (data) => dispatch({ type: data.status, data }),
    };    

    const sendMove = (sourceSquare, targetSquare, piece) => {
        const position = { ...positionObj.current }
        position[targetSquare] = piece
        delete position[sourceSquare]
        dispatch({ type: 'set_fen', fen: position })
        cable.current?.send({ move: sourceSquare + targetSquare, promotion: piece[1] });
        return true
    };

    const handlePlayAgain = () => {
        dispatch({ type: 'play_again' })
        consumer.current?.disconnect()
        cable.current?.unsubscribe()
    }

    const handleNewGame = (action) => {
        dispatch({ type: 'set_room', roomCode: undefined })
        consumer.current = createConsumer(`${import.meta.env.PROD ? import.meta.env.VITE_DOMAIN : "ws://0.0.0.0:3000"}/cable?name=${playerName}`)
        switch (action.type) {
            case 'new_room':
                cable.current = consumer.current.subscriptions.create({ channel: "PvpChannel", vs_friend: true, color: playerColor }, connectionHandler)
                break;

            case 'join_room':
                cable.current = consumer.current.subscriptions.create({ channel: "PvpChannel", room_code: action.room }, connectionHandler)
                break;

            case 'bot':
                cable.current = consumer.current.subscriptions.create({ channel: "BotChannel", difficulty: action.difficulty, color: playerColor }, connectionHandler)
                break;

            case 'player':
                cable.current = consumer.current.subscriptions.create({ channel: "PvpChannel" }, connectionHandler)
                break;

            default:
                console.log("Invalid Type")
                consumer.current?.disconnect()
                break;
        }
    }

    const handleResign = () => {
        if (gameStarted) cable.current?.perform("resign")
        dispatch({ type: 'player_resign' })
    }

    const handleOfferDraw = () => {
        cable.current?.perform("offer_draw")
    }

    const handleDrawResponse = (response) => {
        cable.current?.perform("draw_offer_response", { isAccepted: response })
        dispatch({ type: 'set_snackbar', snackbarOpen: false })
    }

    const handleColorChange = () => {
        dispatch({ type: 'toggle_color' })
    }

    useEffect(() => {
        if (snackbarOpen) {
            const timer = setTimeout(() => {
                handleDrawResponse(false)
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [snackbarOpen]);

    useEffect(() => {
        if (roomJoined === false) {
            cable.current?.unsubscribe()
            consumer.current?.disconnect()
        }
    }, [roomJoined])
	
    return (
        <Box>
            {roomJoined ? (
                <GameDetails
                    roomCode={roomCode}
                    playerName={playerName}
                    playerColor={playerColor}
                    opponentName={opponentName}
                    gameStarted={gameStarted}
                    playerTurn={playerTurn}
                    resign={handleResign}
                    offerDraw={handleOfferDraw}
                />
            ) : (
                <RoomForm
                    handleNewGame={handleNewGame}
                    loading={roomCode === undefined}
                    playerName={playerName}
                    resetName={resetName}
                    playerColor={playerColor}
                    handleColorChange={handleColorChange}
                />
            )}
            <Box display='flex' justifyContent='center'>
                <Box width={{ xs: '90%', sm: 450 }}>
                    <Chessboard
                        position={fen}
                        key="playground"
                        customDarkSquareStyle={{ backgroundColor: '#6d1b7b' }}
                        boardOrientation={playerColor}
                        {...(isSmallScreen ? {} : { boardWidth: 450 })}
                        {
                        ...(gameStarted ?
                            {
                                key: 'main',
                                onPieceDrop: sendMove,
                                arePiecesDraggable: playerTurn,
                                isDraggablePiece: (e) => e.piece[0] === playerColor[0],
                                getPositionObject: (e) => {
                                    positionObj.current = e
                                }
                            } :
                            {}
                        )
                        }
                    />
                </Box>
                {result !== undefined && <GameEndModal result={result} handlePlayAgain={handlePlayAgain} />}
            </Box>
            <Snackbar
                open={snackbarOpen}
                ContentProps={{ sx: { backgroundColor: 'primary.main', color: 'white' } }}
                message={`${opponentName} offered a draw. Auto-reject in 10s.`}
                action={
                    <Stack direction={'row'} gap={1}>
                        <Button color="error" variant="contained" size="small" sx={{ textTransform: 'none' }} onClick={() => { handleDrawResponse(false) }}>
                            Reject
                        </Button>
                        <Button color="success" size="small" variant="contained" sx={{ textTransform: 'none' }} onClick={() => { handleDrawResponse(true) }}>
                            Accept
                        </Button>
                    </Stack>
                }
            />
        </Box>
    );
}
