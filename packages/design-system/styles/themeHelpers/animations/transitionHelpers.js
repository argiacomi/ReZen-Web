import theme from '../../theme';

// Takes a number of milliseconds and returns it formatted as a string with the "ms" suffix.
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}

//--- Transition Creation and Management Utilities ---//
// Creates transition strings for CSS transition properties.
export function createTransitions(props = ['all'], options = {}) {
  const {
    duration: durationOption = theme.transition.duration.standard,
    easing: easingOption = theme.transition.easing.easeInOut,
    delay = 0,
    ...other
  } = options;

  if (process.env.NODE_ENV !== 'production') {
    const isString = (value) => typeof value === 'string';
    const isNumber = (value) => !isNaN(parseFloat(value)) || value.startsWith('var(');

    const checkArgumentType = (arg, argName, typeFn, errorMessage) => {
      if (!typeFn(arg)) {
        console.error(errorMessage);
      }
    };

    checkArgumentType(
      props,
      'props',
      (value) => isString(value) || Array.isArray(value),
      'Argument "props" must be a string or Array.'
    );
    checkArgumentType(
      durationOption,
      'duration',
      isNumber,
      `Argument "duration" must be a number or a string but found ${durationOption}.`
    );
    checkArgumentType(easingOption, 'easing', isString, 'Argument "easing" must be a string.');
    checkArgumentType(delay, 'delay', isNumber, 'Argument "delay" must be a number or a string.');

    const checkUnrecognizedArgs = (args) => {
      const keys = Object.keys(args);
      if (keys.length !== 0) {
        console.error(`Unrecognized argument(s) [${keys.join(',')}].`);
      }
    };
    checkUnrecognizedArgs(other);
  }

  return (Array.isArray(props) ? props : [props])
    .map(
      (animatedProp) =>
        `${animatedProp} ${
          typeof durationOption === 'string' ? durationOption : formatMs(durationOption)
        } ${easingOption} ${typeof delay === 'string' ? delay : formatMs(delay)}`
    )
    .join(',');
}
