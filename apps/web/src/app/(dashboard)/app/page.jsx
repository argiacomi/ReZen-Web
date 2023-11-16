'use client';

import React, { useCallback } from 'react';
import { Drawer, Masthead, SignUpCard } from '@views';
import styled, { Box, Text } from 'design-system';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  SelectionMode,
  addEdge,
  useEdgesState,
  useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';

export default function Home() {
  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Masthead
        open={open}
        handleDrawer={handleDrawer}
        sx={({ theme }) => ({ zIndex: `calc(${theme.zIndex.drawer} + 1)` })}
      />
      <Drawer open={open} handleDrawer={handleDrawer} />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          mt: '56px',
          p: '12px',
          mr: '24px',
          backgroundColor: 'transparent',
          width: '100%',
          height: 'calc(100vh - 56px)'
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          panOnScroll
          selectionOnDrag
          panOnDrag={[1, 2]}
          selectionMode={SelectionMode.Partial}
          proOptions={{ hideAttribution: true }}
          viewport={{ x: 0, y: 0, zoom: 1 }}
          snapToGrid
        >
          {/* <Controls /> */}
          {/* <MiniMap zoomable pannable /> */}
          <Background variant='dots' gap={12} size={1} />
        </ReactFlow>
      </Box>
    </Box>
  );
}
