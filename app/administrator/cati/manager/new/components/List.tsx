import StrictModeDroppable from './StrictModeDroppable'
import React, { useState } from 'react'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'

function List() {
  const [list, setList] = useState([
    {
      templateSeq: 8,
      templateName: 'test',
      total: '2',
      isGet: '2',
      queue: 1,
    },
    {
      templateSeq: 22,
      templateName: 'test0814',
      total: '2',
      isGet: '0',
      queue: 2,
    },
  ])
  return (
    <DragDropContext
      onDragEnd={(result) => {
        if (!result.destination) return
        const items = Array.from(list)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        setList(items)
      }}
    >
      <StrictModeDroppable droppableId="list">
        {(provided) => (
          <div
            className="flex flex-col gap-2 "
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((item, index) => {
              const { isGet, queue, templateName, total } = item
              return (
                <Draggable key={queue} draggableId={templateName} index={index}>
                  {(provided) => (
                    <div
                      className="flex bg-white "
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div>{templateName}</div>
                      <div>{total}</div>
                      <div>{isGet}</div>
                      <div>{queue}</div>
                    </div>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  )
}

export default List
