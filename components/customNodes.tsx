'use client'

import PortalAwareItem from '@/utils/portal-aware-item';
import { useEffect, useState } from 'react';
import { Draggable, Droppable } from "react-beautiful-dnd";

function CustomNode({ data, fields }: any) {

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
      const animation = requestAnimationFrame(() => setEnabled(true));
      return () => {
          cancelAnimationFrame(animation);
          setEnabled(false);
      };
  }, []);

  if (!enabled) {
      return null;
  }

  return (
    <Droppable droppableId={data.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="relative flex flex-col justify-center h-auto w-[150px] bg-white">
          {data.fields.map((item:any, index:any) => (
            <Draggable draggableId={item.id} index={index} key={item.id}>
              {(provided) => (
                <div
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                  className='w-full border border-red-500 flex justify-center items-center h-[50px]'>
                  <PortalAwareItem provided={provided}>
                    {item.name}
                  </PortalAwareItem>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default CustomNode;
