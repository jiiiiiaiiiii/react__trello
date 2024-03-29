import React from 'react';
import { Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{isDragging: boolean}>`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;  
  background-color: ${(props) => props.isDragging ? '#74b9ff' : props.theme.cardColor};
	box-shadow: ${(props) => props.isDragging ? '0px 3px 10px rgba(0, 0, 0, 0.5)' : 'none'};
`;

interface IDragabbleCardProps {
	toDoId: number;
	toDoText: string;
	index: number;
}

function DragabbleCard({toDoId, toDoText, index}: IDragabbleCardProps) {
	console.log(toDoText, 'is rendered');	

  return (
		// draggableId: string;
    <Draggable draggableId={toDoId+''} index={index}>
      {(provided, snapshot) => (
        <Card
					isDragging = {snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
