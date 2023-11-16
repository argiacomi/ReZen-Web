'use client';

import React from 'react';
import { Drawer, Masthead, SignUpCard } from '@views';
import styled, { Box, Text } from 'design-system';

export default function Home() {
  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Masthead
        open={open}
        handleDrawer={handleDrawer}
        sx={({ theme }) => ({ zIndex: `calc(${theme.zIndex.drawer} + 1)` })}
      />
      <Box m={10}>Landing Page!</Box>
    </Box>
  );
}
