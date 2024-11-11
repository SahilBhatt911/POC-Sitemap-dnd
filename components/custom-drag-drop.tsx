import React, { useState } from "react";

const DragDropComponent = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Handler for when drag starts
  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  // Handler for allowing the drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault(); // Necessary to allow a drop
    setDragOverIndex(index);
  };

  // Handle drop on another element
  const handleDrop = (targetIndex: number) => {
    if (draggedItemIndex !== null) {
      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(draggedItemIndex, 1); // Remove dragged item
      updatedItems.splice(targetIndex, 0, draggedItem); // Insert at new position
      setItems(updatedItems);
    }
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  };

  // Handle drop on droppable area
  const handleDropOnDroppable = () => {
    if (draggedItemIndex !== null) {
      const updatedItems = [...items];
      updatedItems.splice(draggedItemIndex, 1); // Remove from the list
      setItems(updatedItems);
      // Add logic to handle where you want to add the item in the droppable area
    }
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div style={{ height: "100vh" }} className="flex justify-center">
      <div className="flex flex-row gap-4">
        {/* Droppable Area */}
        <div
          className="w-[500px] h-[500px] bg-red-600"
          onDragOver={(e) => handleDragOver(e, -1)}
          onDrop={handleDropOnDroppable}
        >
          Droppable
        </div>

        {/* List of Draggable Items */}
        <div className="flex flex-col gap-2">
          {items.map((item, index) => (
            <div
              key={index}
              draggable={true}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              className={`w-[80px] h-[50px] flex items-center justify-center 
                ${
                draggedItemIndex === index ? "bg-gray-500" : "bg-gray-500"
                }
                `
                }
              style={{
                border: dragOverIndex === index ? "2px dashed #000" : "none",
              }}
            >
              {item}
            </div>
          ))}

          {/* Placeholder for Dragged Item */}
          {dragOverIndex === items.length && (
            <div
              className="w-[80px] h-[50px] flex items-center justify-center bg-gray-700"
              style={{ border: "2px dashed #000" }}
            >
              Drop here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragDropComponent;
