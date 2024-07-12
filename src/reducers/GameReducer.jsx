import { Notyf } from "notyf";

const notyf = new Notyf({
    types: [
        {
            type: 'warning',
            background: 'orange',
            icon: '<img src="\\warning.svg" alt="warning" />'
        }
    ]
});

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'set_room': {
            state.roomCode = action.roomCode
            break
        }
        case 'success': {
            state.fen = action.data.state
            break
        }
        case 'failed': {
            notyf.error(action.data.message)
            break
        }
        case 'room_joined': {
            state.roomJoined = true;
            state.playerColor = action.data.color
            state.roomCode = action.data.room
            break
        }
        case 'game_started': {
            state.gameStarted = true
            const opponentColor = state.playerColor === 'white' ? 'black' : 'white'
            state.opponentName = action.data[opponentColor]
            state.fen = "start"
            notyf.success("Game Begins")
            break
        }
        case 'checkmate': {
            state.result = action.data.color === state.playerColor ? 'winner' : 'loser'
            break
        }
        case 'stalemate': {
            state.result = 'stalemate'
            break;
        }
        case 'error': {
            notyf.error('Unable to join room');
            state.roomCode = null
            break;
        }
        case 'play_again': {
            state.roomCode = undefined
            state.roomJoined = false
            state.gameStarted = false
            state.result = undefined
            state.opponentName = undefined
            break
        }
        case 'room_destroyed': {
            notyf.open({
                type: 'warning',
                message: action.data.message
            });
            state.roomCode = undefined
            state.roomJoined = false
            state.gameStarted = false
            state.opponentName = undefined
            break
        }
        default: {
            throw new Error(`Unknown action: ${action.type}`)
        }
    }
}

export default gameReducer