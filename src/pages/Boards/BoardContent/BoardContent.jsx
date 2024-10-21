import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sorts';
import {
    DndContext,
    PointerSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';


const BoardContent = ({ board }) => {
    // https://docs.dndkit.com/api-documentation/sensors
    // Nếu dùng pointerSensor mặc định thì phải kết hợp thuộc tính CSS touch-action: none ở những phần tử kéo thả
    // Nhưng mà còn bug
    // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });
    // Yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợp khi click bị gọi event
    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
    // Nhấn giữ 250ms và dung sai cảm ứng (dễ hiểu là di chuuyển/ chênh lệch 500px) thì mới kích hoạt event
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } });

    // Ưu tiên sử dụng kết hợp 2 loại sensors là mouse và touch để có trải nghiệm trên mobile tốt nhất, không bị bug
    const sensors = useSensors(mouseSensor, touchSensor);


    const [orderedColumns, setOrderedColumns] = useState([]);

    useEffect(() => {
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])



    const handleDragEnd = (event) => {
        console.log('handleDragEnd: ', event);
        const { active, over } = event;

        // Kiểm tra nếu không tồn tại over (kép linh tinh ra ngoài thì return luôn tránh lỗi)
        if (!over) return;

        // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
        if (active.id !== over.id) {
            // Lấy vị trí cũ (từ thằng active)
            const oldIndex = orderedColumns.findIndex(c => c._id === active.id);

            // Lấy vị trí mới (từ thằng over)
            const newIndex = orderedColumns.findIndex(c => c._id === over.id);

            // Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Column ban đầu
            const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);

            // Sau dùng để xử lý gọi api
            // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);
            // console.log('dndOrderedColumns: ',dndOrderedColumns);
            // console.log('dndOrderedColumnsIds: ', dndOrderedColumnsIds);

            // Cập nhật lại state column ban đầu sau khi kéo thả
            setOrderedColumns(dndOrderedColumns);
        }
    }


    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <Box
                sx={{
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
                    height: (theme) => theme.workSmart.boardContentHeight,
                    p: '10px 0',
                }}>

                <ListColumns columns={orderedColumns} />

            </Box>
        </DndContext>

    )
}

export default BoardContent