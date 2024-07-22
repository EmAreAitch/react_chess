import { useState } from 'react';
import { TextField, Button, Box, Paper, ButtonGroup, Grid, Divider, Typography, CircularProgress, useMediaQuery, Select, MenuItem, InputLabel, FormControl, Stack, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
export default function RoomForm({ handleNewGame, loading, playerName, resetName, handleColorChange, playerColor }) {
    const [room, setRoom] = useState('');
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('easy_bot'); // Set your default value here    

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const handleSubmit = (e) => {
        e.preventDefault();
        switch (value) {
            case 'friend':
                setOpen(true)
                break;

            default:
                if (value.slice(-3) === 'bot')
                    handleNewGame({ type: 'bot', difficulty: value })
                else if (value === 'player')
                    handleNewGame({ type: 'player' })
                break;
        }

    }

    const handleClose = (e) => {
        setOpen(false)
    }

    const handleRoomCodeChange = (e) => {
        if (/^\d{0,6}$/.test(e.target.value))
            setRoom(e.target.value)
    }
    return (
        <Box display='flex' justifyContent='center' alignItems='start' padding={2}>
            <Paper variant='outlined'>
                <Stack direction={isSmallScreen ? 'column' : 'row'} spacing={1} justifyContent={'center'} alignItems={'center'} padding={'10px 20px'}>
                    <Stack direction='row' gap={0} justifyContent={'center'} alignItems={'center'}>
                        <IconButton onClick={handleColorChange} disabled={value === 'player'}>
                            <Avatar sx={{ bgcolor: '#dadada' }} src={`${playerColor}.svg`} />
                        </IconButton>
                        <Button size='large' onClick={resetName} justifyContent={'center'} alignItems={'center'} sx={{paddingX: 0}}>
                            <Typography borderBottom={'1px solid'} borderColor={'primary.main'} paddingX={2} color={'white'} textTransform={'none'}>
                                {playerName}
                            </Typography>
                        </Button>
                    </Stack>
                    <Divider sx={{ flexGrow: 1, minWidth: '75px' }} flexItem={isSmallScreen}>
                        {loading ? (
                            <CircularProgress size={isSmallScreen ? '1rem' : '2rem'} />
                        ) : (
                            <Typography variant='caption'>VS.</Typography>
                        )}
                    </Divider>
                    <form onSubmit={handleSubmit}>
                        <ButtonGroup >
                            <FormControl>
                                <InputLabel id="select-label">Mode</InputLabel>
                                <Select
                                    labelId="select-label"
                                    id="select"
                                    value={value}
                                    label="Mode"
                                    onChange={(event) => { 
                                        setValue(event.target.value)
                                        if (event.target.value === 'player' && playerColor === 'black')
                                            handleColorChange()
                                    }}
                                    size='small'
                                    sx={{ borderRadius: 0, minWidth: 150 }}
                                >
                                    <MenuItem value={'player'}>Player</MenuItem>
                                    <MenuItem value={'friend'}>Friend</MenuItem>
                                    <MenuItem value={'easy_bot'}>Easy Bot</MenuItem>
                                    <MenuItem value={'normal_bot'}>Normal Bot</MenuItem>
                                    <MenuItem value={'hard_bot'}>Hard Bot</MenuItem>
                                </Select>
                            </FormControl>
                            <Button type="submit" variant="contained" color="primary" sx={{ paddingX: 2, borderRadius: 0 }}>
                                Start
                            </Button>
                        </ButtonGroup>
                    </form>
                </Stack>
            </Paper>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Start new game</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Stack spacing={2} divider={<Divider>OR</Divider>}>
                        <Button variant='contained' onClick={() => {
                            handleNewGame({ type: "new_room" })
                            setOpen(false)
                        }}>
                            Create room
                        </Button>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            handleNewGame({ type: "join_room", room })
                            setOpen(false)
                        }}>
                            <ButtonGroup>
                                <FormControl>
                                    <TextField
                                        label='Enter room code'
                                        value={room}
                                        size='small'
                                        onChange={handleRoomCodeChange}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderRadius: "5px 0px 0px 5px",
                                                },
                                            },
                                        }}
                                    />
                                </FormControl>
                                <Button type="submit" variant="contained" color="primary" sx={{ paddingX: 2, borderRadius: "0px 5px 5px 0px" }}>
                                    Join
                                </Button>
                            </ButtonGroup>
                        </form>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Box>
    )
}