import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragabbleCard from './DragabbleCard';

const Wrapper = styled.div`
  padding: 30px 10px 20px;
  border-radius: 5px;
  min-height: 300px;
  background-color: ${(props) => props.theme.boardColor};
`;

const Title = styled.h1`
	text-align: center;
	font-weight: 600;
	margin-bottom: 10px;
	font-size: 18px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
			<Title>{boardId}</Title>
			<Droppable droppableId={boardId}>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						{toDos.map((toDo, index) => (
							<DragabbleCard key={toDo} index={index} toDo={toDo} />
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</Wrapper>
  );
}

export default Board;
