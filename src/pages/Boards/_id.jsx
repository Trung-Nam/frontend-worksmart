
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from '~/pages/Boards/BoardBar/BoardBar';
import BoardContent from '~/pages/Boards/BoardContent/BoardContent';
import { mockData } from '~/apis/mock-data';
import { fetchBoardDetailsAPI } from '~/apis';

const Board = () => {
    const [board, setBoard] = useState(null);
    
    useEffect(() => {
        const boardId = '671ccdecbc3c71d61393ba56';
        fetchBoardDetailsAPI(boardId).then((board) => {
            setBoard(board);
        })
    }, []);

    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={mockData.board} />
            <BoardContent board={mockData.board} />
        </Container>
    )
}

export default Board