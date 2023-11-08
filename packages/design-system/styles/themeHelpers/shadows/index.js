export const shadows = {
  dropShadow: {
    0: 'drop-shadow(0 0px rgba(0 0 0 / 0))',
    1: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))',
    2: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
    3: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
    4: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))',
    5: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))'
  },
  boxShadow: {
    light: {
      color: '220 3% 15%',
      strength: '1%'
    },
    dark: {
      color: '220 40% 2%',
      strength: '25%'
    },
    0: 'none',
    1: '0 1px 2px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 9%));',
    2: '0 3px 5px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)), 0 7px 14px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%))',
    3: '0 -1px 3px 0 hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)), 0 1px 2px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)), 0 2px 5px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)), 0 4px 12px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)), 0 12px 15px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 7%))',
    4: '0 -2px 5px 0 hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)), 0 1px 1px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)), 0 2px 2px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)), 0 5px 5px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)), 0 9px 9px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)), 0 16px 16px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 6%))',
    5: '0 -1px 2px 0 hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)), 0 2px 1px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)), 0 5px 5px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)), 0 10px 10px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)), 0 20px 20px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)), 0 40px 40px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 7%))',
    6: '0 -1px 2px 0 hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)), 0 3px 2px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)), 0 7px 5px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)), 0 12px 10px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)), 0 22px 18px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)), 0 41px 33px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 6%)), 0 100px 80px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 7%))',
    7: '0 -1px 3px 0 hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),0 4px 3px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)),0 8px 6px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)),0 15px 12px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)),0 28px 22px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)),0 50px 40px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 6%)),0 120px 95px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 7%)),0 240px 190px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 8%))',
    8: '0 -1px 3px 1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)), 0 5px 4px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2.5%)), 0 10px 7px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)), 0 20px 14px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3.5%)), 0 40px 28px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)), 0 75px 55px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4.5%)), 0 150px 110px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)), 0 300px 220px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5.5%))',
    9: '0 -1px 3px 1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),0 6px 4px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2.5%)),0 12px 8px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)),0 24px 16px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3.5%)),0 48px 32px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)),0 96px 64px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4.5%)),0 192px 128px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)),0 384px 256px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5.5%)), 0 768px 512px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 6%))',
    fab: '0 -1px 2px 0 hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)), 0 3px 2px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)), 0 7px 5px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)), 0 12px 10px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)), 0 22px 18px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)), 0 41px 33px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 6%)), 0 100px 80px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 7%))',
    fabActive:
      '0 -1px 3px 1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),0 6px 4px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2.5%)),0 12px 8px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)),0 24px 16px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3.5%)),0 48px 32px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)),0 96px 64px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4.5%)),0 192px 128px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)),0 384px 256px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5.5%)), 0 768px 512px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 6%))',
    popper: '0 6px 16px 0 rgba(0 0 0 / 0.08), 0 3px 6px -4px rgba(0 0 0 / 0.12), 0 9px 28px 8px rgba(0 0 0 / 0.05)',
    popperArrow: '2px 2px 5px rgba(0 0 0 / 0.05)'
  }
};
