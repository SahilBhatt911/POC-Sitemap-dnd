"use client";

import './App.css';
import { ReactFlow } from '@xyflow/react';
import CustomNode from '@/components/customNodes';

function App() {
  const nodeTypes = { textUpdater: CustomNode };

  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' }, type: 'textUpdater' }
  ];

  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

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
  );
}

export default App;
