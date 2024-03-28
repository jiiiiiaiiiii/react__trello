import React from 'react';
import { Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;  
  background-color: ${(props) => props.theme.cardColor};
`;

interface IDragabbleCardProps {
	toDo: string;
	index: number;
}

function DragabbleCard({toDo, index}: IDragabbleCardProps) {
	console.log(toDo, 'is rendered');	

  return (
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
  );
}
/* ✨ React.memo
- 고차 컴포넌트(Higher Order Component)
- 변화된 props만 re-rendering
*/ 
export default React.memo(DragabbleCard);
