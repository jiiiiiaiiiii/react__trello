import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { toDoState } from './atom';

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
`;

const Board = styled.div`
  padding: 30px 10px 20px;
  border-radius: 5px;
  min-height: 200px;
  background-color: ${(props) => props.theme.boardColor};
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;  
  background-color: ${(props) => props.theme.cardColor};
`;

function App() {
  const [toDos, setToDos] =  useRecoilState(toDoState);

  const onDragEnd = ({draggableId, destination, source}: DropResult) => {
    if(!destination) return; // destination이 없는 경우, 변경❌

    setToDos(oldToDos => {
      // 0. copy oldToDos
      const toDosCopy = [...oldToDos];
      // 1. Delete item on source.index
      console.log('Delete item on', source.index);
      console.log(toDosCopy);
      toDosCopy.splice(source.index, 1);
      console.log('after delete item');
      console.log(toDosCopy);
            
      // 2. Put the item on the destination.index
      console.log('Put back ', draggableId, 'on ', destination.index);
      toDosCopy.splice(destination?.index, 0, draggableId); // draggableId = toDo
      console.log(toDosCopy);

      return toDosCopy;
    })
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId='one'>
            {(provided) => (
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {toDos.map((toDo, index) => (
                  // ✨ key = draggableId : 동일한 값이어야 함
                  <Draggable key={toDo} draggableId={toDo} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {toDo}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder} {/* Card가 Board에서 out-dragging 시어도, Board 크기 변경 ❌ */}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
