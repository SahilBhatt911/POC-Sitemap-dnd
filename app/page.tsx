"use client";

import './App.css';
import { useState } from 'react';
import { ReactFlow } from '@xyflow/react';
import CustomNode from '@/components/customNodes';

function App() {
  const nodeTypes = { textUpdater: CustomNode };

  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' }, type: 'textUpdater' }
  ];

  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

  const [box, setBox] = useState(
    [
      {
        id: "0",
        bg: "red"
      },
      {
        id: "1",
        bg: "green"
      }
    ]);

  // function handleOnDragEnd(result : any) {
  //   if(!result.destination) return;
  //   const newBox = Array.from(box);
  //   const [draggedItem] = newBox.splice(result.source.index, 1);
  //   newBox.splice(result.destination.index, 0, draggedItem);
  //   setBox(newBox);
  // }

  // const [isBrowser, setIsBrowser] = useState(false);

  // useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       setIsBrowser(true);
  //     }
  //   }, []);

  return (

    <div style={{ height: "100vh" }}>
      <ReactFlow 
        nodeTypes={nodeTypes} 
        nodes={initialNodes.map((node: any) => ({
          ...node,
          data: {
            ...node.id,
            ...node.position
          },
        }))}
        edges={initialEdges} 
      />
    </div>

    // <DragDropContext onDragEnd={handleOnDragEnd}>
    //    {
    //     isBrowser && <Droppable droppableId="boxes">
    //     {(provided) => (
    //       <ul ref={provided.innerRef} {...provided.droppableProps}>
    //         {box.map(({id, bg}, index) => 
    //           <Draggable key={id} draggableId={id} index={index}>
    //             {(provided) => (
    //               <li 
    //                 ref={provided.innerRef} 
    //                 {...provided.draggableProps} 
    //                 {...provided.dragHandleProps} 
    //                 onClick={() => console.log(id)}
    //               >
    //                 <div className={`box ${bg}`}></div>
    //               </li>
    //             )}
    //           </Draggable>
    //         )}
    //         {provided.placeholder}
    //       </ul>
    //     )}
    //   </Droppable>
    //   }
    // </DragDropContext>
  );
}

export default App;
