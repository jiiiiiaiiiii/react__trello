import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragabbleCard from './DragabbleCard';
import { useRef } from 'react';

const Wrapper = styled.div`
  padding-top: 10px;
  border-radius: 5px;
  min-height: 300px;
  background-color: ${(props) => props.theme.boardColor};
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
	isDraggingOver: boolean;
	isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
	padding: 20px;
  background-color: ${(props) => (props.isDraggingOver ? '#dfe6e9' : (props.isDraggingFromThis ? '#b2bec3' :'transparent'))};
  flex-grow: 1;
	transition: background-color 0.3s ease-in-out;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const onClick = () => {
		inputRef.current?.focus();
		setTimeout(() => {
			inputRef.current?.blur();
		}, 5000);
	};
	
  return (
    <Wrapper>
      <Title>{boardId}</Title>
			<input ref={inputRef} placeholder='grab me' />
			<button onClick={onClick}>click me</button>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}	// dragging 여부
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}  // out-dragging 되는 보드
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard key={toDo} index={index} toDo={toDo} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
