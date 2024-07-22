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
            state.playerTurn = action.data.state.split(' ')[1] === state.playerColor[0]
            break
        }
        case 'set_fen': {
            state.fen = action.fen
            break
        }
        case 'failed': {
            state.fen = action.data.state
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
            state.playerTurn = state.playerColor === 'white'
            notyf.success("Game Begins")            
            break
        }
        case 'checkmate': {
            state.result = action.data.color === state.playerColor ? 'winner' : 'loser'
            break
        }
        case 'opponent_resign': {
            state.result = 'opponent_resign'
            break
        }
        case 'player_resign': {
            state.result = 'player_resign'
            break
        }        
        case 'stalemate': {
            state.result = 'stalemate'
            break;
        }
        case 'error': {            
            notyf.error(action.data.message);
            state.roomCode = null
            break;
        }
        case 'play_again': {
            state.roomCode = null
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
            state.roomCode = null
            state.roomJoined = false
            state.gameStarted = false
            state.opponentName = undefined
            break
        }
        case 'set_snackbar': {
            state.snackbarOpen = action.snackbarOpen
            break
        }
        case 'draw_offered': {
            let color = action.data.color
            if (state.playerColor === color) {
                notyf.success("Offer sent")
            } else {
                state.snackbarOpen = true
            }
            break
        }
        case 'draw_accepted': {
            state.result = 'draw'
            break
        }
        case 'draw_rejected': {
            notyf.error("Draw offer rejected")
            break
        }
        case 'draw_cooldown': {
            notyf.open({
                type: 'warning',
                message: "Wait for 2 mintues since last offer"
            });
            break
        }

        case 'toggle_color': {
            state.playerColor = state.playerColor === 'white' ? 'black' : 'white'
            break
        }
        default: {
            throw new Error(`Unknown action: ${action.type}`)
        }
    }
}

export default gameReducer