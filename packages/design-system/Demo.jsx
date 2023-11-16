import React from 'react';
import styled from '@styles';
import { Box, Paper, Stack } from '@components';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.colors.text.secondary
}));

export default function DirectionStack() {
  return (
    <div>
      <Stack direction='row' spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </div>
  );
}
