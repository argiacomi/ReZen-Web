'use client';

import React from 'react';
import { SignInCard } from '@views';
import { Box, Text } from 'design-system';

export default function Home() {
  return (
    <Box sx={{ m: '20px', display: 'flex' }}>
      <SignInCard />
    </Box>
  );
}
