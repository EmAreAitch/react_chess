import { useState, useRef, useEffect } from "react";
import { createConsumer } from "@rails/actioncable";
import { Chessboard } from "react-chessboard";

export default function ChessboardWrapper({ playerName, roomCode }) {
    const [fen, setFen] = useState("start");
    const gameChannelRef = useRef(null);
    const [room, setRoom] = useState(roomCode);
    const [gameConclusion, setGameConclusion] = useState(null);
    const playerColor = roomCode === '-1' ? 'w' : 'b'
    useEffect(() => {
        const consumer = createConsumer(`ws://127.0.0.1:3000/cable?name=${playerName}`);
        const roomObj = roomCode !== "-1" ? { room_code: roomCode } : {};

        gameChannelRef.current = consumer.subscriptions.create(
            { channel: "GameChannel", ...roomObj },
            {
                connected() {
                    console.log("Connected");
                },
                disconnected() {
                    console.log("Disconnected");
                },
                received(data) {
                    console.log("Received", data['status']);
                    switch (data["status"]) {
                        case "success":
                            setFen(data["state"]);
                            break;
                        case "room_created":
                            setRoom(data['room']);
                            break;
                        case "failed":
                            console.log(data["message"]);
                            break;
                        case 'checkmate':
                            setGameConclusion(`Winner is ${data['winner']}`)
                            break;
                        case 'stalemate':
                            setGameConclusion("Stalemate")
                            break;
                        case 'error':
                            console.log("ROOM not Found")
                            break
                        default:
                            console.log("UNKNOWN STATUS");
                            break;
                    }
                },
                rejected() {
                    console.log("Room Not found")
                }            
            }
        );
        return () => {
            gameChannelRef.current?.unsubscribe();
        };
    }, []);

    const sendMove = (sourceSquare, targetSquare, piece) => {
        gameChannelRef.current?.send({ move: sourceSquare + targetSquare, promotion: piece[1] });
    };

    const handleDraggability = () => {
        return !gameConclusion && (playerColor === fen.charAt(fen.length - 1) || (playerColor === 'w' && fen === 'start'))
    }

    const getTurnMessage = () => {
        if(handleDraggability()) {
            return "Your Turn"
        } else if (playerColor == 'b') {
            return "Waiting for white to move"
        } else {
            return "Waiting for black to move"
        }
    }

    return (
        room != '-1' ?
            (
                <>
                    <h2>Room Code: {room}</h2>
                    <h2>{getTurnMessage()}</h2>
                    <Chessboard
                        boardWidth={500}
                        position={fen}
                        onPieceDrop={sendMove}
                        arePiecesDraggable={handleDraggability()}
                        isDraggablePiece={({ piece }) => piece[0] == playerColor}
                        boardOrientation={playerColor == 'w' ? 'white' : 'black'}
                    />
                    {gameConclusion && <p>{gameConclusion}</p>}
                </>
            )
            :
            (
                <p>Loading</p>
            )

    );
}
