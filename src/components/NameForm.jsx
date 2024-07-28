import React, { useState } from 'react';
import { TextField, Button, Paper, Box, Typography, FormControl, Divider } from '@mui/material';

export default function NameForm({ setPlayerName }) {
    const [name, setName] = useState(localStorage.getItem('name'));
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('name', name);
        sessionStorage.setItem('name', name);        
        setPlayerName(name);
    }
    return (
        <Box display='flex' justifyContent='center' alignItems='center' height={'100%'} flexGrow={1}>
            <Paper sx={{ display: 'grid', gridGap: 20, padding: 3 }} variant='outlined'>
                <Typography variant='h6' textAlign={'center'} >
                    Give yourself a name
                </Typography>
                <Divider />
                <Typography variant='p' >
                    Put your minds to the test and challenge your friends to a real-time chess battle!
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth={true}>
                        <TextField
                            label="Name"
                            value={name || ''}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                            placeholder="Be creative, stand out!"
                        />
                        <br />
                        <Button type="submit" variant="contained" color="primary" autoFocus={true} disableFocusRipple={true}>
                            Continue
                        </Button>
                    </FormControl>
                </form>
            </Paper>
        </Box>
    )
}