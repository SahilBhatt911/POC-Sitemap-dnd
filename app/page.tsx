'use client';

import { useEffect, useState } from 'react';
import { Panel, ReactFlow } from '@xyflow/react';
import HeroHeader from '@/components/hero-header';
import { Monitor, Tablet, Smartphone } from "lucide-react";
import './App.css'

function App() {
  const [viewMode, setViewMode] = useState('desktop');
  
  const initialNodes = [
    {
      id: '1',
      position: { x: -50, y: 100 },
      data: { label: 'Sample Node' },
      type: 'custom',
    },
  ];

  const CustomNode = () => <HeroHeader viewMode={viewMode} />;

  const nodeTypes = {
    custom: CustomNode,
  };

  return (
    <div className="overflow-auto w-screen h-screen">
      <div className="flex items-center gap-4 p-2 bg-gray-100 rounded-lg shadow">
        <button
          className="flex flex-col items-center justify-center cursor-pointer text-gray-600 hover:text-blue-500"
          onClick={() => {setViewMode('desktop'); console.log('clicked')}}
          title="Desktop Mode"
        >
          <Monitor size={24} />
          <span className="text-xs">Desktop</span>
        </button>
        <button
          className="flex flex-col items-center justify-center cursor-pointer text-gray-600 hover:text-blue-500"
          onClick={() => {setViewMode('tablet'); console.log('clicked')}}
          title="Tablet Mode"
        >
          <Tablet size={24} />
          <span className="text-xs">Tablet</span>
        </button>
        <button
          className="flex flex-col items-center justify-center cursor-pointer text-gray-600 hover:text-blue-500"
          onClick={() => setViewMode('mobile')}
          title="Mobile Mode"
        >
          <Smartphone size={24} />
          <span className="text-xs">Mobile</span>
        </button>
      </div>
      <ReactFlow
        nodes={initialNodes}
        nodeTypes={nodeTypes}
        fitView
        className='bg-gray-300'
      />
    </div>
  );
}

export default App;
