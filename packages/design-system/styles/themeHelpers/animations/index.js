import { keyframes } from '../../styleEngine';
import { createTransitions } from './transitionHelpers';

export const animations = {
  keyframe: {
    enterKeyframe: keyframes`
      0% {
        transform: scale(0);
        opacity: 0.1;
      }
      100% {
        transform: scale(1);
        opacity: 0.3;
      }
    `,
    exitKeyframe: keyframes`
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    `,
    pulsateKeyframe: keyframes`
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.92);
      }
      100% {
        transform: scale(1);
      }
    `,
    pulseKeyframe: keyframes`
      0%, 100% {
        opacity: 1
      }
      50% {
        opacity: .5
      }
    `,
    waveKeyframe: keyframes`
      0% {
        transform: translateX(-100%);x
      }
      50%, 100% {
        transform: translateX(100%);
      }
    `
  },
  transition: {
    create: (props, options) => createTransitions(props, options),
    duration: {
      duration0: 0,
      duration25: 25,
      duration50: 50,
      duration75: 75,
      duration100: 100,
      duration350: 350,
      duration400: 400,
      duration450: 450,
      duration500: 500,
      duration550: 550,
      duration600: 600,
      duration650: 650,
      duration700: 700,
      duration750: 750,
      duration800: 800,
      duration850: 850,
      duration900: 900,
      duration950: 950,
      duration1000: 1000,
      shortest: 150,
      shorter: 200,
      short: 250,
      leavingScreen: 195,
      enteringScreen: 225,
      standard: 300,
      complex: 375,
      ripple: 550
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      linear: 'linear',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    }
  }
};
