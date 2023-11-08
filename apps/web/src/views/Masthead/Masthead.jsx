import * as React from 'react';
import styled, { AppBar, Avatar, Box, Icon, IconButton, Stack, Toolbar } from 'design-system';
import ThemeToggle from './ThemeToggle';

const Logo = styled(Box)`
  font-family: 'DomaineDisplay';
  font-weight: 800;
  font-size: 2rem;
  display: inline-flex;

  & .re {
    color: ${({ theme }) => theme.colors.text.main};
  }

  & .volution {
    color: ${({ theme }) => theme.colors.primary.body};
    transition: opacity 0.3s ease-in-out;
  }

  & .zen {
    color: ${({ theme }) => theme.colors.text.main};
  }
`;

export default function Masthead({ handleDrawer, ...other }) {
  return (
    <>
      <AppBar position='fixed' color='transparent' elevation={0} display='block' {...other}>
        <Toolbar
          disableGutters
          sx={{
            height: '56px',
            px: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box display='flex' flexDirection='row' alignItems='center'>
            <IconButton
              size='medium'
              edge='start'
              color='inherit'
              aria-label='menu'
              m={0}
              mr={1.75}
              onClick={handleDrawer}
            >
              <Icon icon='FiMenu' strokeWidth='1px' />
            </IconButton>
            <Logo lang='en' component='span' mr={2}>
              <Box component='span' className='re'>
                Re
              </Box>
              <Box component='span' className='volution'>
                volution
              </Box>
              <Box component='span' className='zen'>
                Zen
              </Box>
            </Logo>
          </Box>
          <Box
            sx={{
              flex: '0 1 732px',
              minWidth: 0,
              display: 'flex'
            }}
          />
          <Stack direction='row' alignItems='center'>
            <IconButton size='small' icon='IoMdNotificationsOutline'></IconButton>
            <ThemeToggle size='small' />
            <IconButton p={0} height='32px' width='60px' disableRipple>
              <Avatar height='32px' width='32px' backgroundColor='primary.body' />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}
