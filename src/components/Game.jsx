import { useMemo, useRef} from "react";
import RoomForm from "./RoomForm";
import { Chessboard } from "react-chessboard";
import { Box, useMediaQuery } from "@mui/material";
import { createConsumer } from "@rails/actioncable";
import GameDetails from "./GameDetails";
import GameEndModal from "./GameEndModal";
import { useImmerReducer } from "use-immer";
import gameReducer from "../reducers/GameReducer";

export default function Game({ playerName }) {
    const [gameState, dispatch] = useImmerReducer(gameReducer, {
        roomCode: undefined,
        roomJoined: false,
        gameStarted: false,
        result: undefined,
        opponentName: undefined,
        fen: 'start',
        playerColor: undefined
    })
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const consumer = useMemo(() => createConsumer(`wss://rails-chess.onrender.com/cable?name=${playerName}`), []); // Player name does not change
    const cable = useRef(undefined);
    const { roomCode, roomJoined, gameStarted, result, opponentName, fen, playerColor } = gameState

    const connectionHandler = {
        connected: () => { },
        disconnected: () => { },
        received: (data) => {
            dispatch({ type: data.status, data })
        },
    };


    const sendMove = (sourceSquare, targetSquare, piece) => {
        cable.current?.send({ move: sourceSquare + targetSquare, promotion: piece[1] });
    };

    const handleDraggability = () => {
        const playerTurn = fen.split(' ')[1]
        return (playerColor[0] === playerTurn || (playerColor[0] === 'w' && fen === 'start'))
    }

    const handlePlayAgain = () => {
        dispatch({ type: 'play_again' })
        cable.current?.unsubscribe()
    }

    const handleNewGame = (action) => {
        switch (action.type) {
            case 'new_room':
                cable.current = consumer.subscriptions.create({ channel: "PvpChannel" }, connectionHandler)
                break;

            case 'join_room':
                cable.current = consumer.subscriptions.create({ channel: "PvpChannel", room_code: action.room }, connectionHandler)                
                break;

            case 'bot':
                cable.current = consumer.subscriptions.create({ channel: "BotChannel", difficulty: action.difficulty }, connectionHandler)
                break;

            default:
                console.log("Invalid Type")
                break;
        }
    }
    return (
        <>
            {roomJoined ? (
                <GameDetails
                    roomCode={roomCode}
                    playerName={playerName}
                    playerColor={playerColor}
                    opponentName={opponentName}
                    gameStarted={gameStarted}
                    playerTurn={handleDraggability()}
                />
            ) : (
                <RoomForm handleNewGame={handleNewGame} loading={roomCode != undefined} playerName={playerName} />
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
                                arePiecesDraggable: handleDraggability(),
                                isDraggablePiece: ({ piece }) => piece[0] == playerColor[0],
                            } :
                            {}
                        )
                        }
                    />
                </Box>
                {result !== undefined && <GameEndModal result={result} handlePlayAgain={handlePlayAgain} />}
            </Box>
        </>
    );
}
