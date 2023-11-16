import React from 'react';
import styled from '@styles';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Text,
  TextField
} from '@components';

const SignUpCard = styled(Card)(({ theme }) => ({
  width: theme.pxToRem(408),
  maxWidth: 'calc(100vw - 5rem)',
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  gap: theme.spacing(4),
  borderRadius: theme.spacing(2),
  padding: `${theme.pxToRem(38)} ${theme.pxToRem(32)} ${theme.pxToRem(48)}`
}));

const SignUpCardHeader = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  gap: theme.spacing(0.5),
  padding: 0
}));

const SignUpCardMain = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  gap: theme.spacing(2),
  padding: 0
}));

const SocialButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row',
  alignItems: 'center',
  justifyContent: 'start',
  gap: theme.spacing(2),
  padding: theme.pxToRem(10, 20),
  borderColor: 'rgba(0, 0, 0, 0.23)',
  '&:hover': {
    borderColor: theme.colors.text.primary
  },
  [`${theme.getColorSchemeSelector()}`]: {
    borderColor: 'rgba(255, 255, 255, 0.23)',
    '&:hover': {
      borderColor: theme.colors.text.primary
    }
  },
  '& .Icon-Root:last-of-type': {
    visibility: 'hidden'
  },
  '&:hover .Icon-Root': {
    visibility: 'visible'
  }
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.colors.alpha.add(theme.colors.action.active, 0.25),
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.colors.alpha.add(theme.colors.action.active, 0.5)
  }
}));

const ActionLinks = styled(Button)(({ theme }) => ({
  margin: 0,
  padding: 0,
  minWidth: 0,
  color: theme.colors.text.primary,
  fontSize: 'inherit',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'transparent'
  }
}));

export default function AuthDev() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={({ theme }) => ({ width: theme.pxToRem(408), m: 10 })}>
      <SignUpCard>
        <SignUpCardHeader>
          <Text variant='h6' fontWeight='bold'>
            Create your account
          </Text>
          <Text variant='p' color='text.secondary'>
            to continue to ReZen
          </Text>
        </SignUpCardHeader>
        <SignUpCardMain>
          <SocialButton variant='outlined' color='default' disableElevation>
            <Icon color='text.primary' size={20} icon='FaGithub' alt='GitHub' />
            <Text display='flex' justifyContent='flex-start' width='100%' color='text.primary' variant='p'>
              Continue with GitHub
            </Text>
            <Icon icon='MdChevronRight' />
          </SocialButton>
          <SocialButton variant='outlined' color='default' disableElevation>
            <Icon size={20} icon='FcGoogle' alt='Google' />
            <Text display='flex' justifyContent='flex-start' width='100%' color='text.primary' variant='p'>
              Continue with Google
            </Text>
            <Icon icon='MdChevronRight' />
          </SocialButton>
        </SignUpCardMain>
        <Divider>
          <Box component='span' color='text.secondary'>
            or
          </Box>
        </Divider>
        <Stack direction='column' spacing={3}>
          <Stack direction='row' spacing={2}>
            <TextField autoFocus id='firstName' label='First Name' margin='none' type='text' size='small' fullWidth />
            <TextField id='lastName' label='Last Name' margin='none' type='text' size='small' fullWidth />
          </Stack>
          <Stack direction='column' spacing={3}>
            <TextField fullWidth id='email' label='Email Address' margin='none' type='email' size='small' />
            <TextField
              fullWidth
              id='password'
              label='Password'
              margin='none'
              type={showPassword ? 'text' : 'password'}
              size='small'
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <StyledIconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        <Icon icon={showPassword ? 'MdVisibilityOff' : 'MdVisibility'} />
                      </StyledIconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
          </Stack>
        </Stack>
        <CardActions p={0}>
          <Stack width='100%' direction='column' spacing={2}>
            <Button fullWidth variant='filled' disableElevation sx={{ '&:hover': { backgroundColor: 'primary.600' } }}>
              CONTINUE
            </Button>
            <Box display='flex' alignItems='center' mt='20px' fontSize='14px' gap='4px'>
              Already have an account?
              <Button
                sx={{
                  m: 0,
                  p: 0,
                  minWidth: 0,
                  fontSize: '14px',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'transparent'
                  }
                }}
                variant='colorText'
                component='a'
                href='/signin'
                endIcon='MdArrowRightAlt'
              >
                Sign In
              </Button>
            </Box>
          </Stack>
        </CardActions>
      </SignUpCard>
      <Box
        sx={{
          mt: '20px',
          fontSize: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          color: 'monochrome.text'
        }}
      >
        <ActionLinks variant='text' component='a' href='/'>
          &copy; 2023 Rezen AI Technologies
        </ActionLinks>
        <Stack
          direction='row'
          spacing={0.75}
          sx={{ justifyContent: 'flex-end', fontSize: 'inherit', color: 'text.secondary' }}
        >
          <ActionLinks variant='text' component='a' href='/support'>
            Support
          </ActionLinks>
          <ActionLinks variant='text' component='a' href='/privacy'>
            Privacy
          </ActionLinks>
          <ActionLinks variant='text' component='a' href='/terms'>
            Terms
          </ActionLinks>
        </Stack>
      </Box>
    </Box>
  );
}
