'use client'
import { useCallback, useEffect, useRef, useState } from 'react';
import { EllipsisVertical, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { createPortal } from 'react-dom'; // For the portal

const handleStyle = { left: 10 };

const PortalAwareItem = ({ children, provided }: any) => {
  const isDragging = provided.draggableProps.style?.position === 'fixed';

  if (!isDragging) {
    return children;
  }

  return createPortal(children, document.body);
};

function CustomNode({ data, id }: any) {
  const [fields, setFields] = useState([
    { id: 'field1', name: 'Field 1', description: 'Description for Field 1' },
    { id: 'field2', name: 'Field 2', description: 'Description for Field 2' },
  ]);
  
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  // Handle the drag end event to reorder the fields
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    const reorderedFields = Array.from(fields);
    const [removed] = reorderedFields.splice(source.index, 1);
    reorderedFields.splice(destination.index, 0, removed);
    setFields(reorderedFields); // Update the fields state
  };

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);

  return (
    <div className="relative flex justify-between h-auto">
      <div className="col-span-2 flex flex-col z-[1]">
        <div className="col-start-2 row-start-1 flex justify-center w-[200px]">
          <div className="text-updater-node h-auto border border-[#cbcbcb99] rounded-[10px] bg-[#fcfcfc] relative">
            <header className={`pl-[10px] pr-[10px] h-[30px] rounded-t-[10px]`}>
              <div className="flex flex-row justify-between items-center p-[8px]">
                <h2 className="font-medium text-white text-[12px] leading-[9px]">Home Page</h2>
                <button className="text-white">
                  <EllipsisVertical className="w-[15px] h-[20px]" />
                </button>
              </div>
            </header>
            <div className="flex justify-around p-[8px] z-[10000]">
              <>
                <DragDropContext onDragEnd={onDragEnd}>
                  {isBrowser && (
                    <Droppable droppableId="droppable">
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                          {fields.map((field: any, index: number) => (
                            <Draggable key={field.id} draggableId={field.id} index={index}>
                              {(provided) => (
                                <PortalAwareItem provided={provided}>
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="flex flex-row gap-[4px] border border-[#cbcbcb99] hover:border-[#DC79FF] border-solid rounded-[4px] bg-white p-2 mt-[7px] h-[60px] w-[200px]"
                                  >
                                    <div className="flex justify-center items-center w-[24px]">
                                      <GripVertical className="w-22 h-22 text-[#AEAEAE]" />
                                    </div>
                                    <div className="flex flex-col">
                                      <input
                                        style={handleStyle}
                                        type="text"
                                        defaultValue={field.name}
                                        onChange={onChange}
                                        placeholder="Name"
                                        className="text-[#091e42] font-inter font-medium text-base w-[150px]"
                                      />
                                      <input
                                        style={handleStyle}
                                        type="text"
                                        defaultValue={field.description}
                                        onChange={onChange}
                                        placeholder="Description"
                                        className="text-[#5e6c84] font-inter text-base font-normal leading-[150%] w-[150px]"
                                      />
                                    </div>
                                  </div>
                                </PortalAwareItem>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  )}
                </DragDropContext>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomNode;
