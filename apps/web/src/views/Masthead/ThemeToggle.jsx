'use client';

import React from 'react';
import styled, { Icon, IconButton } from 'design-system';
import { useTheme } from 'next-themes';

const ThemeToggle = styled(IconButton)`
  --ease-sun: cubic-bezier(0.25, 0, 0.3, 1);
  --ease-out-moon: cubic-bezier(0, 0, 0, 1);
  --ease-elastic-sun: cubic-bezier(0.5, 1.25, 0.75, 1.25);
  --ease-elastic-sun-beams: cubic-bezier(0.5, 1.5, 0.75, 1.25);
  width: 36px;
  height: 36px;
`;

const Sun = styled(Icon)`
  position: absolute;
  & > :is(path, circle) {
    transform-origin: center center;
    opacity: 1;
    transition: opacity 0.5s var(--ease-sun);
  }
  @media (prefers-reduced-motion: no-preference) {
    & > :is(circle) {
      transition: transform 0.5s var(--ease-elastic-sun);
    }
    & > :is(path) {
      transition:
        transform 0.5s var(--ease-elastic-sun-beams),
        opacity 0.5s var(--ease-sun);
    }
    [data-theme='dark'] & {
      & > :is(circle) {
        transform: scale(0);
        transition-duration: 0.5s;
        transition-timing-function: var(--ease-sun);
      }
      & > :is(path) {
        transform: rotateZ(-45deg);
        opacity: 0;
        transition-duration: 0.5s;
      }
    }
  }
`;

const Moon = styled(Icon)`
  position: absolute;
  & > :is(path) {
    transform-origin: center center;
    opacity: 0;
    transition: opacity 0.5s var(--ease-sun);
    transform: scale(0);
  }
  @media (prefers-reduced-motion: no-preference) {
    & > :is(path) {
      transition: transform 0.5s var(--ease-elastic-sun);
    }
    [data-theme='dark'] & {
      & > :is(path) {
        transform: scale(1);
        opacity: 1;
        transition-duration: 0.5s;
        transition-timing-function: var(--ease-sun);
      }
    }
  }
`;

export default function ThemeSwitcher(props) {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeToggle
      {...props}
      className='theme-toggle'
      id='theme-toggle'
      title='Toggles light & dark'
      aria-label={theme}
      aria-live='polite'
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
    >
      <Sun icon='IoSunnyOutline' />
      <Moon icon='IoMoonOutline' />
    </ThemeToggle>
  );
}
