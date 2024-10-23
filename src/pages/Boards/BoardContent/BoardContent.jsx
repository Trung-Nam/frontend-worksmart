import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sorts';
import {
    DndContext,
    // PointerSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
    closestCorners
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './ListColumns/Column/Column';
import CardItem from './ListColumns/Column/ListCards/CardItem/CardItem';
import { cloneDeep } from 'lodash';


const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

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

    // Cùng 1 thời điểm chỉ có 1 phần tử được kéo (column or card)
    const [activeDragItemId, setActiveDragItemId] = useState(null);
    const [activeDragItemType, setActiveDragItemType] = useState(null);
    const [activeDragItemData, setActiveDragItemData] = useState(null);


    useEffect(() => {
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])

    // Tìm Column theo cardId
    const findColumnByCardId = (cardId) => {
        // Đoạn này cần lưu ý, nên dùng c.cards thay vì c.cardOrderIds bởi vì ở bước handleDragOver 
        // chúng ta sẽ làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới.
        return orderedColumns.find(column => column.cards.map(card => card._id)?.includes(cardId));
    }

    // Trigger khi bắt đầu kéo 1 phần tử
    const handleDragStart = (event) => {
        // console.log('handleDragStart: ', event);
        setActiveDragItemId(event?.active?.id);
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN);
        setActiveDragItemData(event?.active?.data?.current);
    }

    // Trigger trong quá trình kéo 1 phần tử
    const handleDragOver = (event) => {
        // Không làm gì nếu đang kéo column
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

        // Nếu kéo card sẽ sử lý thêm để kéo qua lại giữa các columns
        // console.log('handleDragOver', event);

        const { active, over } = event;

        // Kiểm tra nếu không tồn tại active hoặc over (kéo linh tinh ra ngoài thì return luôn tránh lỗi)
        if (!active || !over) return;
        // activeDraggingCard: là cái đang được kéo 
        const { id: activeDraggingCardId, data: { current: activeDraggingData } } = active;
        // overCard: là cái card đang tương tác trên hoặc dưới so với cái đang được kéo ở trên
        const { id: overCardId } = over;

        // Tìm 2 column theo cardId
        const activeColumn = findColumnByCardId(activeDraggingCardId);
        const overColumn = findColumnByCardId(overCardId);

        // Nếu không tồn tại 1 trong 2 column thì không làm gì hết tránh crash trang web
        if (!activeColumn || !overColumn) return;

        // Xử lý logic ở đây chỉ khi kéo card qua 2 column khác nhau, còn nếu kéo card trong chính column ban đầu của nó thì không làm gì
        // Vì đây đang là đoạn xử lý lúc kéo (handleDragOver), còn xử lý lúc kéo xong xuôi thì nó lại là vấn đề khác ở (handleDragEnd)
        if (activeColumn._id !== overColumn._id) {
            setOrderedColumns(prevColumns => {
                // Tìm vị trí (index) của cái overCard trong column đích (nơi mà activeCard sắp được thả)
                const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId);

                // Logic tính toán "cardIndex" mới (trên hoặc dưới của overCard) lấy chuẩn ra từ code của thư viện – nhiều khi muốn từ chối hiểu =)
                let newCardIndex;
                const isBelowOverItem = active.rect.current.translated &&
                    active.rect.current.translated.top > over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0;

                newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;
                // Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return – cập nhật lại OrderedColumnsState mới
                const nextColumns = cloneDeep(prevColumns);
                const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id);
                const nextOverColumn = nextColumns.find(column => column._id === overColumn._id);

                // Column cũ 
                if (nextActiveColumn) {
                    // Xóa card ở cái column active (cũng có thể hiểu là column cũ, cái lúc mà kéo card ra khỏi nó để sang column khác)
                    nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
                    // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
                    nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id);
                }
                // Column mới
                if (nextOverColumn) {
                    // Kiểm tra xem card đang kéo có tồn tại ở overColumn chưa, nếu có thì xóa nó trước
                    nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
                    // Thêm cái card đang kéo vào overColumn theo vị trí index mới 
                    nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingData);
                    // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
                    nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id);
                }
                console.log('nextOverColumn', nextOverColumn);


                return nextColumns;
            })

        }
    }

    // Trigger khi kết thúc hành động kéo 1 phần tử
    const handleDragEnd = (event) => {
        // console.log('handleDragEnd: ', event);


        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            console.log('Hành động kéo thả - Tạm thời không làm gì cả');
            return;
        }

        const { active, over } = event;

        // Kiểm tra nếu không tồn tại active hoặc over (kéo linh tinh ra ngoài thì return luôn tránh lỗi)
        if (!active || !over) return;

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

        setActiveDragItemId(null);
        setActiveDragItemType(null);
        setActiveDragItemData(null);
    }
    // console.log('activeDragItemId:', activeDragItemId)
    // console.log('activeDragItemType:', activeDragItemType)
    // console.log('activeDragItemData:', activeDragItemData)

    /**
     * Animation khi kéo thả (drag) phần tử 
     * Test bằng cách kéo thả trực tiếp và nhìn phần giữ chỗ overlay
     */

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    }

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            // Thuật toán phát hiện va chạm (nếu không có nó thì card với cover lớn sẽ không kéo qua Column được vì lúc này nó đang bị conflict giữa card và column), chúng ta sẽ dùng closestCorners thay vì closestCenter
            // https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
            collisionDetection={closestCorners}
            sensors={sensors}>
            <Box
                sx={{
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
                    height: (theme) => theme.workSmart.boardContentHeight,
                    p: '10px 0',
                }}>

                <ListColumns columns={orderedColumns} />
                <DragOverlay dropAnimation={dropAnimation}>
                    {!activeDragItemType && null}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <CardItem card={activeDragItemData} />}
                </DragOverlay>
            </Box>
        </DndContext>

    )
}

export default BoardContent