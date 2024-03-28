import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { toDoState } from './atom';
import DragabbleCard from './Components/DragabbleCard';

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

function App() {
  const [toDos, setToDos] =  useRecoilState(toDoState);

  const onDragEnd = ({draggableId, destination, source}: DropResult) => {
    if(!destination) return; // destination이 없는 경우, 변경❌

    setToDos(oldToDos => {
      // 0. copy oldToDos
      const toDosCopy = [...oldToDos];
      // 1. Delete item on source.index
      /* console.log('Delete item on', source.index);
      console.log(toDosCopy); */
      toDosCopy.splice(source.index, 1);
      /* console.log('after delete item');
      console.log(toDosCopy); */
            
      // 2. Put the item on the destination.index
      /* console.log('Put back ', draggableId, 'on ', destination.index); */
      toDosCopy.splice(destination?.index, 0, draggableId); // draggableId = toDo
      /* console.log(toDosCopy); */

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
                  <DragabbleCard key={toDo} index={index} toDo={toDo} />
                ))}
                {provided.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
