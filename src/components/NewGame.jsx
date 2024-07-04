export default function NewGame() {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <>
            <RoomForm setRoomCode={setRoomCode} />
            <Box display='flex' justifyContent='center'>
                <Box width={{ xs: 300, sm: 450 }}>
                    <Chessboard boardWidth={isSmallScreen ? 300 : 450} customDarkSquareStyle={{ backgroundColor: '#6d1b7b' }} />
                </Box>
            </Box>
        </>
    )
}