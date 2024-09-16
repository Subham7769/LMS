import React from 'react';
import { ReactFlow,MiniMap, Controls, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Initial nodes and edges
const initialNodes = [
  {
    id: '1',
    type: 'input', // Input node type
    data: { label: 'Input Node' },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    type: 'Default', // Default node type
    data: { label: 'Default Node' },
    position: { x: 100, y: 100 },
  },
];

const initialEdges = [];

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  return (
    <div style={{ height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
