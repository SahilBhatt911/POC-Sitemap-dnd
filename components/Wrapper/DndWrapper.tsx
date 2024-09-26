'use client';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ReactNode } from 'react';
import { reorderList } from '@/utils/reorderItem';
import PortalAwareItem from '@/utils/portal-aware-item';

interface DnDWrapperProps<T> {
  items: T[];
  renderItem: (item: T, index: number, provided: any) => ReactNode;
  onReorder: (newItems: T[]) => void;
}

const DnDWrapper = <T extends { id: string }>({
  items,
  renderItem,
  onReorder,
}: DnDWrapperProps<T>) => {

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    const reorderedItems = reorderList(items, source.index, destination.index);
    onReorder(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <PortalAwareItem provided={provided}>
                    {renderItem(item, index, provided)}
                  </PortalAwareItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DnDWrapper;
