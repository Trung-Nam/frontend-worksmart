
import { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from '~/pages/Boards/BoardBar/BoardBar';
import BoardContent from '~/pages/Boards/BoardContent/BoardContent';
// import { mockData } from '~/apis/mock-data';
import { createNewCardAPI, createNewColumnAPI, fetchBoardDetailsAPI, moveCardToDifferentColumnAPI, updateBoardDetailsAPI, updateColumnDetailsAPI } from '~/apis';
import { isEmpty } from 'lodash';
import { generatePlaceHolderCard } from '~/utils/formatters';
import { mapOrder } from '~/utils/sorts';

const Board = () => {
    const [board, setBoard] = useState(null);

    useEffect(() => {
        const boardId = '671e1fac23d5e730f0b2b709';
        fetchBoardDetailsAPI(boardId).then((board) => {
            // Sắp xếp thứ tự column luôn ở đây trước khi đưa dữ liệu xuống bên dưới các components con
            board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id');

            board.columns.forEach((column) => {
                // Cần xử lý vấn đề kéo thả vào 1 column rỗng
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceHolderCard(column)];
                    column.cardOrderIds = [generatePlaceHolderCard(column)._id];
                } else {
                    // Sắp xếp thứ tự cards luôn ở đây trước khi đưa dữ liệu xuống bên dưới các components con
                    column.cards = mapOrder(column.cards, column.cardOrderIds, '_id');
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

            if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
                columnToUpdate.cards = [createdCard];
                columnToUpdate.cardOrderIds = [createdCard._id];
            } else {

                columnToUpdate.cards.push(createdCard);
                columnToUpdate.cardOrderIds.push(createdCard._id);
            }
        }
        setBoard(newBoard);
    }
    // Func có nhiệm vụ gọi api và xử lý khi kéo thả column xong xuôi
    const moveColumns = (dndOrderedColumns) => {
        const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);

        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns;
        newBoard.columnOrderIds = dndOrderedColumnsIds;
        setBoard(newBoard);

        // Gọi api update board
        updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds });

    }

    /**
     * Khi di chuyển card trong cùng column
     * Chỉ cần gọi api để cập nhật mảng cardOrderIds của Column chứa nó (thay đổi vị trí trong mảng)
     */
    const moveCardInSameColumn = (dndOrderedCards, dndOrderedCardsIds, columnId) => {
        // Update cho chuẩn dữ liệu state board
        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(column => column._id === columnId);
        if (columnToUpdate) {
            columnToUpdate.cards = dndOrderedCards;
            columnToUpdate.cardOrderIds = dndOrderedCardsIds;
        }
        setBoard(newBoard);

        // Gọi API update column
        updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardsIds });

    }

    /**
     * Khi di chuyển card sang Column khác:
     * B1: Cập nhật mảng cardOrderIds của Column ban đầu chứa nó (Hiểu bản chất là xóa cái _id của Card ra khỏi mảng)
     * B2: Cập nhật mảng cardOrderIds của Column tiếp theo (Hiểu bản chất là thêm _id của Card vào mảng)
     * B3: Cập nhật lại trường columnId mới của cái Card đã kéo
     */
    const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
        const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);
        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns;
        newBoard.columnOrderIds = dndOrderedColumnsIds;
        setBoard(newBoard);

        // Gọi API
        let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds;
        // Xử lý vẫn đề khi kéo phần tử cuối cùng ra khỏi column, column rỗng sẽ có place holder card , cần xóa đi trc khi gửi cho BE
        if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = [];

        moveCardToDifferentColumnAPI({
            currentCardId,
            prevColumnId,
            prevCardOrderIds,
            nextColumnId,
            nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
        })
    }

    if (!board) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    width: '100vw',
                    height: '100vh'
                }}
            >
                <CircularProgress />
                <Typography>Loading board...</Typography>
            </Box>
        )
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
                moveCardInSameColumn={moveCardInSameColumn}
                moveCardToDifferentColumn={moveCardToDifferentColumn}
            />
        </Container>
    )
}

export default Board