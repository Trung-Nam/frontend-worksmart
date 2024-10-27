
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from '~/pages/Boards/BoardBar/BoardBar';
import BoardContent from '~/pages/Boards/BoardContent/BoardContent';
// import { mockData } from '~/apis/mock-data';
import { createNewCardAPI, createNewColumnAPI, fetchBoardDetailsAPI, updateBoardDetailsAPI } from '~/apis';
import { isEmpty } from 'lodash';
import { generatePlaceHolderCard } from '~/utils/formatters';

const Board = () => {
    const [board, setBoard] = useState(null);

    useEffect(() => {
        const boardId = '671e1fac23d5e730f0b2b709';
        fetchBoardDetailsAPI(boardId).then((board) => {
            // Cần xử lý vấn đề kéo thả vào 1 column rỗng
            board.columns.forEach((column) => {
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceHolderCard(column)];
                    column.cardOrderIds = [generatePlaceHolderCard(column)._id];
                }
            })
            setBoard(board);
        })
    }, []);

    // Func có nhiệm vụ gọi API tạo mới Column và làm mới lại dữ liệu state board
    const createNewColumn = async (newColumnData) => {
        const createdColumn = await createNewColumnAPI({
            ...newColumnData,
            boardId: board._id
        });

        // Cần xử lý vấn đề kéo thả vào 1 column rỗng vì khi tạo mới 1 column thì nó chưa có card
        createdColumn.cards = [generatePlaceHolderCard(createdColumn)];
        createdColumn.cardOrderIds = [generatePlaceHolderCard(createdColumn)._id];

        // Cập nhật state board
        const newBoard = { ...board }
        newBoard.columns.push(createdColumn);
        newBoard.columnOrderIds.push(createdColumn._id);
        setBoard(newBoard);
    }
    // Func có nhiệm vụ gọi API tạo mới Card và làm mới lại dữ liệu state board
    const createNewCard = async (newCardData) => {
        const createdCard = await createNewCardAPI({
            ...newCardData,
            boardId: board._id
        });

        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId);
        if (columnToUpdate) {
            columnToUpdate.cards.push(createdCard);
            columnToUpdate.cardOrderIds.push(createdCard._id);
        }
        setBoard(newBoard);
    }
    // Func có nhiệm vụ gọi api và xử lý khi kéo thả column xong xuôi
    const moveColumns = async (dndOrderedColumns) => {
        const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);

        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns;
        newBoard.columnOrderIds = dndOrderedColumnsIds;
        setBoard(newBoard);

        // Gọi api update board
        await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds });

    }

    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent
                board={board}
                createNewColumn={createNewColumn}
                createNewCard={createNewCard}
                moveColumns={moveColumns}
            />
        </Container>
    )
}

export default Board