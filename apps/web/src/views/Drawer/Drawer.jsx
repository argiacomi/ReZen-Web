import * as React from 'react';
import styled, {
  Box,
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from 'design-system';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: '100vw',
  [theme.breakpoints.up('sm')]: {
    width: drawerWidth
  },
  transition: theme.transition.create('width', {
    easing: theme.transition.easing.sharp,
    duration: theme.transition.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme) => ({
  overflowX: 'hidden',
  width: '0px',
  [theme.breakpoints.up('sm')]: {
    width: '72px'
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  minHeight: 56
}));

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...openedMixin(theme),
  ...(!open && { ...closedMixin(theme) }),
  '& .Drawer-Paper': {
    ...openedMixin(theme),
    ...(!open && { ...closedMixin(theme) }),
    borderRight: '0px'
  }
}));

const list = [
  { text: 'Home', icon: 'MdHome' },
  { text: 'Tasks', icon: 'MdOutlineToc' },
  { text: 'Apps', icon: 'MdOutlineDashboard' },
  { text: 'Task History', icon: 'MdHistory' },
  { text: 'Help', icon: 'MdHelpOutline' }
];

export default function MiniDrawer({ open, handleDrawer, ...other }) {
  return (
    <StyledDrawer variant='permanent' open={open}>
      <Box mt='56px' overflow='auto' py='12px' px={open ? '14px' : 1}>
        <List disablePadding component='nav'>
          {list.map((item, index) => (
            <ListItemButton sx={{ p: 0 }} key={item.text} value={index}>
              <ListItemIcon color='monochrome' sx={{ ml: open ? 0 : '6px', minWidth: 0, p: 1 }}>
                <Icon icon={item.icon} size={28} />
              </ListItemIcon>
              <ListItemText display={open ? null : 'none'} primary={item.text} />
            </ListItemButton>
          ))}
          <Divider display={open ? null : 'none'} my='.75rem' />
          <ListItemButton sx={{ p: 0 }}>
            <ListItemIcon color='monochrome' sx={{ ml: open ? 0 : '6px', minWidth: 0, p: 1 }}>
              <Icon icon='MdOutlinePayment' size={28} />
            </ListItemIcon>
            <ListItemText display={open ? null : 'none'} primary='Billing' />
          </ListItemButton>
        </List>
      </Box>
    </StyledDrawer>
  );
}

{
  /* <Divider display={open ? null : 'none'} my='.75rem' />
          <ListItem
            disablePadding
            sx={{
              borderRadius: '10px',
              width: 'calc(100% - 12px)',
              height: '40px',
              '& .ListItemButton-Root': {
                borderRadius: '10px',
                width: 'calc(100% - 12px)',
                height: '40px',
                py: 0,
                px: '12px'
              }
            }}
          >
            <ListItemButton disableGutters>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  color: 'monochrome.body'
                }}
              >
                <Icon icon='MdOutlinePayment' size={28} />
              </ListItemIcon>
              <ListItemText display={open ? null : 'none'} primary='Billing' />
            </ListItemButton>
          </ListItem> */
}
