import { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sorts';
import {
    DndContext,
    // PointerSensor,
    // MouseSensor,
    // TouchSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
    closestCorners,
    pointerWithin,
    // rectIntersection,
    getFirstCollision,
    // closestCenter
} from '@dnd-kit/core';
import { MouseSensor, TouchSensor } from '~/customLibraries/DndKitSensors';

import { arrayMove } from '@dnd-kit/sortable';
import Column from './ListColumns/Column/Column';
import CardItem from './ListColumns/Column/ListCards/CardItem/CardItem';
import { cloneDeep, isEmpty } from 'lodash';
import { generatePlaceHolderCard } from '~/utils/formatters';


const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

const BoardContent = ({ board, createNewColumn, createNewCard }) => {
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
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null);
    // Điểm va chạm cuối cùng (sử lý thuật toán phát hiện va chạm)
    const lastOverId = useRef(null);

    useEffect(() => {
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])

    // Tìm Column theo cardId
    const findColumnByCardId = (cardId) => {
        // Đoạn này cần lưu ý, nên dùng c.cards thay vì c.cardOrderIds bởi vì ở bước handleDragOver 
        // chúng ta sẽ làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới.
        return orderedColumns.find(column => column.cards.map(card => card._id)?.includes(cardId));
    }
    // Function chung Cập nhật lại state trong trường hợp di chuyển Card giữa các column khác nhau
    const moveCardBetweenDifferentColumns = (
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingData
    ) => {
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
                // Thêm Placeholder Card nếu Column rỗng, Bị kéo hết Card đi, không còn cái nào nữa
                if (isEmpty(nextActiveColumn.cards)) {
                    nextActiveColumn.cards = [generatePlaceHolderCard(nextActiveColumn)];
                }
                // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
                nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id);
            }

            // Column mới
            if (nextOverColumn) {
                // Kiểm tra xem card đang kéo có tồn tại ở overColumn chưa, nếu có thì xóa nó trước
                nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
                // Phải cật nhật lại chuẩn dữ liệu columnId trong card sau khi kéo card giữa 2 column khác nhau
                const rebuild_activeDraggingData = {
                    ...activeDraggingData,
                    columnId: nextOverColumn._id
                }

                // Thêm cái card đang kéo vào overColumn theo vị trí index mới 
                nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingData);

                // Xóa Placeholder Card đi nếu nó đang tồn tại
                nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard);

                // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
                nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id);
            }

            return nextColumns;
        })
    }


    // Trigger khi bắt đầu kéo 1 phần tử
    const handleDragStart = (event) => {
        // console.log('handleDragStart: ', event);
        setActiveDragItemId(event?.active?.id);
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN);
        setActiveDragItemData(event?.active?.data?.current);

        // Nếu là kéo card thì mới thực hiện hành động set giá trị oldColumn
        if (event?.active?.data?.current?.columnId) {
            setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
        }
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
            moveCardBetweenDifferentColumns(
                overColumn,
                overCardId,
                active,
                over,
                activeColumn,
                activeDraggingCardId,
                activeDraggingData
            );
        }
    }

    // Trigger khi kết thúc hành động kéo 1 phần tử
    const handleDragEnd = (event) => {
        // console.log('handleDragEnd: ', event);
        const { active, over } = event;

        // Kiểm tra nếu không tồn tại active hoặc over (kéo linh tinh ra ngoài thì return luôn tránh lỗi)
        if (!active || !over) return;

        // Xử lý kéo thả card
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            // activeDraggingCard: là cái đang được kéo 
            const { id: activeDraggingCardId, data: { current: activeDraggingData } } = active;
            // overCard: là cái card đang tương tác trên hoặc dưới so với cái đang được kéo ở trên
            const { id: overCardId } = over;

            // Tìm 2 column theo cardId
            const activeColumn = findColumnByCardId(activeDraggingCardId);
            const overColumn = findColumnByCardId(overCardId);

            // Nếu không tồn tại 1 trong 2 column thì không làm gì hết tránh crash trang web
            if (!activeColumn || !overColumn) return;



            // Hành động kéo thả card giữa 2 column khác nhau
            // Phải dùng tới activeDragItemData.columnId hoặc oldColumnWhenDraggingCard._id (set vào state từ bước handleDragStart) 
            // chứ không phải activeData trong scope handleDragEnd này vì sau khi đi qua onDragOver thì đây là state của card đã bị cập nhật một lần rồi.

            if (oldColumnWhenDraggingCard._id !== overColumn._id) {
                moveCardBetweenDifferentColumns(
                    overColumn,
                    overCardId,
                    active,
                    over,
                    activeColumn,
                    activeDraggingCardId,
                    activeDraggingData
                );
            } else {
                // Hành động kéo thả card trong cùng 1 column

                // Lấy vị trí cũ (từ thằng oldColumnWhenDraggingCard)
                const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId);

                // Lấy vị trí mới (từ thằng over)
                const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId);

                // Dùng arrayMove vì kéo card trong 1 cái column thì tương tự với logic kéo column trong 1 cái board content
                const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex);


                setOrderedColumns(prevColumns => {
                    // Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return – cập nhật lại OrderedColumnsState mới
                    const nextColumns = cloneDeep(prevColumns);

                    // Tìm tới column chúng ta đang thả
                    const targetColumn = nextColumns.find(column => column._id === overColumn._id);

                    //Cập nhật lại 2 giá trị mới là card và cardOderIds trong cái targetColumn'
                    targetColumn.cards = dndOrderedCards;
                    targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id);

                    // Trả về giá trị state mới (chuẩn vị trí)
                    return nextColumns;
                })

            }


        }
        // Xử lý kéo thả column trong 1 cái board content
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
            if (active.id !== over.id) {
                // Lấy vị trí cũ (từ thằng active)
                const oldColmunIndex = orderedColumns.findIndex(c => c._id === active.id);

                // Lấy vị trí mới (từ thằng over)
                const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id);

                // Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Column ban đầu
                const dndOrderedColumns = arrayMove(orderedColumns, oldColmunIndex, newColumnIndex);

                // Sau dùng để xử lý gọi api
                // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);
                // console.log('dndOrderedColumns: ',dndOrderedColumns);
                // console.log('dndOrderedColumnsIds: ', dndOrderedColumnsIds);

                // Cập nhật lại state column ban đầu sau khi kéo thả
                setOrderedColumns(dndOrderedColumns);
            }
        }
        // Những dữ liệu sau khi kéo thả này luôn phải đưa về giá trị null mặc định ban đầu
        setActiveDragItemId(null);
        setActiveDragItemType(null);
        setActiveDragItemData(null);
        setOldColumnWhenDraggingCard(null);
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

    const collisionDetectionStrategy = useCallback((args) => {
        // Trường hợp kéo column thì dùng thuật toán closestCorners là chẩn nhất
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return closestCorners({ ...args });
        }

        // Tìm các điểm giao nhau, va chạm - intersections với con trỏ
        const pointerIntersections = pointerWithin(args);

        // Fix bug kéo một card có image cover lớn kên phía trên cùng ra khỏi khu vực kéo thả
        if (!pointerIntersections?.length) return;

        // const intersections = pointerIntersections?.length > 0
        //     ? pointerIntersections
        //     : rectIntersection(args);

        // Tìm overId đầu tiên trong đám pointerIntersections ở trên
        let overId = getFirstCollision(pointerIntersections, 'id');

        if (overId) {
            // Nếu cái over nó là column thì sẽ tìm tới cái cardId gần nhất 
            // bên trong khu vực va chạm đó dựa vào thuật toán phát hiện va chạm closestCenter hoặc closestCorners đều được.
            // Tuy nhiên ở đây dùng closestCorners mình thấy mượt mà hơn.
            // Nếu không có đoạn check column này bug flickering vẫn fix đc nhưng mà kéo thả sẽ giật lag
            const checkColumn = orderedColumns.find(column => column._id === overId);
            if (checkColumn) {
                // console.log('overId before:', overId);

                overId = closestCorners({
                    ...args,
                    droppableContainers: args.droppableContainers.filter(container => {
                        return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
                    })
                })[0]?.id
                // console.log('overId after:', overId);

            }
            lastOverId.current = overId;
            return [{ id: overId }]
        }

        // Nếu overId là null thì trả về mảng rỗng - tránh crash trang
        return lastOverId.current ? [{ id: lastOverId.current }] : []

    }, [activeDragItemType, orderedColumns]);

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            // Thuật toán phát hiện va chạm (nếu không có nó thì card với cover lớn sẽ không kéo qua Column được vì lúc này nó đang bị conflict giữa card và column), chúng ta sẽ dùng closestCorners thay vì closestCenter
            // https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
            // Nếu chỉ dùng closestCorners sẽ có bug flickering + sai lệch dữ liệu 
            // collisionDetection={closestCorners}

            // Tự custom nâng cao thuật toán phát hiện va chạm
            collisionDetection={collisionDetectionStrategy}
            sensors={sensors}>
            <Box
                sx={{
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
                    height: (theme) => theme.workSmart.boardContentHeight,
                    p: '10px 0',
                }}>

                <ListColumns
                    columns={orderedColumns}
                    createNewColumn={createNewColumn}
                    createNewCard={createNewCard}
                />
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