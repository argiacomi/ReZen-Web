import scStyled from 'styled-components';

//--- Styled Components Passthrough Functions ---//
export const shouldForwardProp = (prop) => {
  return !['as', 'classes', 'item', 'ownerState', 'ref', 'sx', 'theme'].includes(prop);
};

export default function styled(tag, options) {
  const { displayName, shouldForwardProp: customforwardProp, ...otherAttrs } = options || {};

  const stylesFactory = scStyled(tag).withConfig({
    displayName: displayName ?? tag.displayName ?? tag.name,
    shouldForwardProp: customforwardProp ?? shouldForwardProp
  });

  if (process.env.NODE_ENV !== 'production') {
    return (...styles) => {
      const component = typeof tag === 'string' ? `"${tag}"` : 'component';
      if (styles.length === 0) {
        console.error(
          [
            `Seems like you called \`styled(${component})()\` without a \`style\` argument.`,
            'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'
          ].join('\n')
        );
      } else if (styles.some((style) => style === undefined)) {
        console.error(`The styled(${component})(...args) API requires all its args to be defined.`);
      }
      return stylesFactory(...styles);
    };
  }

  return stylesFactory;
}

export {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
  createGlobalStyle,
  keyframes,
  css,
  useTheme
} from 'styled-components';
