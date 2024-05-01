import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components'

const Area = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: white;
	font-size: 24px;
	line-height: 50px;
	text-align: center;
`;


export default function TrashCan() {
	return (
		<Droppable droppableId='trash'>

        {(provided, snapshot) => (
          <Area
					// isDraggingOver={snapshot.isDraggingOver} // dragging 여부
					ref={provided.innerRef}
					{...provided.droppableProps}
          >
            x
          </Area>
        )}

		</Droppable>
	)
}
