'use client';

import React from 'react';
import { SignUpCard } from '@views';
import { Box, Text } from 'design-system';

export default function Home() {
  return (
    <Box sx={{ m: '20px', display: 'flex' }}>
      <SignUpCard />
    </Box>
  );
}
