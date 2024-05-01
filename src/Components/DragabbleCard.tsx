import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atom';

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? '#74b9ff' : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? '0px 3px 10px rgba(0, 0, 0, 0.5)' : 'none'};
  position: relative;
`;

const DelBtn = styled.button`
  position: absolute;
  right: 10px;
  border: none;
  cursor: pointer;
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DragabbleCard({ toDoId, toDoText, index, boardId }: IDragabbleCardProps) {
  // console.log(toDoText, 'is rendered');
  const setToDos = useSetRecoilState(toDoState);
  const delCard = () => {
    setToDos((allBoards) => {
      const boardCopy = [...allBoards[boardId]];
      boardCopy.splice(index, 1);
      return {
        ...allBoards,
        [boardId]: boardCopy
      };
    })
  };

  return (
    // draggableId: string;
    <Draggable draggableId={toDoId + ''} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoText}
          <DelBtn onClick={delCard}>X</DelBtn>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
