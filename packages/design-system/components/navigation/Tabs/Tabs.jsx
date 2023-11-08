'use client';

import * as React from 'react';
import { isFragment } from 'react-is';
import clsx from 'clsx';
import styled, { extractStyling, useTheme } from '@styles';
import { useEventCallback, useScrollbarSize, useSlotProps } from '@hooks';
import { animate, debounce, detectScrollType, getNormalizedScrollLeft, ownerDocument, ownerWindow } from '@utils';
import { TabScrollButton } from './TabScrollButton';

export const tabsClasses = {
  root: 'Tabs-Root',
  flexContainer: 'Tabs-FlexContainer',
  hideScrollbar: 'Tabs-HideScrollbar',
  indicator: 'Tabs-Indicator',
  scrollableX: 'Tabs-ScrollableX',
  scrollableY: 'Tabs-ScrollableY',
  scroller: 'Tabs-Scroller',
  scrollButtons: 'Tabs-ScrollButtons',
  centered: 'Centered',
  fixed: 'Fixed',
  vertical: 'Vertical',
  scrollButtonsHideMobile: 'ScrollButtonsHideMobile'
};

const nextItem = (list, item) => {
  if (list === item) {
    return list.firstChild;
  }
  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }
  return list.firstChild;
};

const previousItem = (list, item) => {
  if (list === item) {
    return list.lastChild;
  }
  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }
  return list.lastChild;
};

const moveFocus = (list, currentFocus, traversalFunction) => {
  let wrappedOnce = false;
  let nextFocus = traversalFunction(list, currentFocus);

  while (nextFocus) {
    // Prevent infinite loop.
    if (nextFocus === list.firstChild) {
      if (wrappedOnce) {
        return;
      }
      wrappedOnce = true;
    }

    const nextFocusDisabled = nextFocus.disabled || nextFocus.getAttribute('aria-disabled') === 'true';

    if (!nextFocus.hasAttribute('tabindex') || nextFocusDisabled) {
      nextFocus = traversalFunction(list, nextFocus);
    } else {
      nextFocus.focus();
      return;
    }
  }
};

const TabsRoot = styled('div', {
  name: 'Tabs',
  slot: 'Root'
})(({ ownerState, theme }) => ({
  overflow: 'hidden',
  minHeight: 48,
  WebkitOverflowScrolling: 'touch',
  display: 'flex',
  ...(ownerState.vertical && {
    flexDirection: 'column'
  }),
  ...(ownerState.scrollButtonsHideMobile && {
    [`& .${tabsClasses.scrollButtons}`]: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    }
  }),
  ...ownerState.cssStyles
}));

const TabsScroller = styled('div', {
  name: 'Tabs',
  slot: 'Scroller'
})(({ ownerState }) => ({
  position: 'relative',
  display: 'inline-block',
  flex: '1 1 auto',
  whiteSpace: 'nowrap',
  ...(ownerState.fixed && {
    overflowX: 'hidden',
    width: '100%'
  }),
  ...(ownerState.hideScrollbar && {
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  }),
  ...(ownerState.scrollableX && {
    overflowX: 'auto',
    overflowY: 'hidden'
  }),
  ...(ownerState.scrollableY && {
    overflowY: 'auto',
    overflowX: 'hidden'
  })
}));

const FlexContainer = styled('div', {
  name: 'Tabs',
  slot: 'FlexContainer'
})(({ ownerState }) => ({
  display: 'flex',
  ...(ownerState.vertical && {
    flexDirection: 'column'
  }),
  ...(ownerState.centered && {
    justifyContent: 'center'
  })
}));

const TabsIndicator = styled('span', {
  name: 'Tabs',
  slot: 'Indicator'
})(({ ownerState, theme }) => ({
  position: 'absolute',
  height: 2,
  bottom: 0,
  width: '100%',
  transition: theme.transition.create(),
  ...(ownerState.indicatorColor === 'primary' && {
    backgroundColor: theme.colors.primary.body
  }),
  ...(ownerState.indicatorColor === 'secondary' && {
    backgroundColor: theme.colors.secondary.body
  }),
  ...(ownerState.vertical && {
    height: '100%',
    width: 2,
    right: 0
  })
}));

const defaultIndicatorStyle = {};

let warnedOnceTabPresent = false;

const Tabs = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    action,
    centered = false,
    children: childrenProp,
    className,
    component = 'div',
    allowScrollButtonsMobile = false,
    indicatorColor = 'primary',
    onChange,
    orientation = 'horizontal',
    ScrollButtonComponent = TabScrollButton,
    scrollButtons = 'auto',
    selectionFollowsFocus,
    slots = {},
    slotProps = {},
    TabIndicatorProps = {},
    TabScrollButtonProps = {},
    textColor = 'primary',
    value,
    variant = 'standard',
    visibleScrollbar = false,
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const scrollable = variant === 'scrollable';
  const vertical = orientation === 'vertical';

  const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
  const start = vertical ? 'top' : 'left';
  const end = vertical ? 'bottom' : 'right';
  const clientSize = vertical ? 'clientHeight' : 'clientWidth';
  const size = vertical ? 'height' : 'width';

  const ownerState = {
    ...props,
    component,
    cssStyles,
    allowScrollButtonsMobile,
    indicatorColor,
    orientation,
    vertical,
    scrollButtons,
    textColor,
    variant,
    visibleScrollbar,
    fixed: !scrollable,
    hideScrollbar: scrollable && !visibleScrollbar,
    scrollableX: scrollable && !vertical,
    scrollableY: scrollable && vertical,
    centered: centered && !scrollable,
    scrollButtonsHideMobile: !allowScrollButtonsMobile
  };

  const classes = {
    root: [tabsClasses.root, ownerState.vertical && tabsClasses.vertical],
    scroller: [
      tabsClasses.scroller,
      ownerState.fixed && tabsClasses.fixed,
      ownerState.hideScrollbar && tabsClasses.hideScrollbar,
      ownerState.scrollableX && tabsClasses.scrollableX,
      ownerState.scrollableY && tabsClasses.scrollableY
    ],
    flexContainer: [
      tabsClasses.flexContainer,
      ownerState.vertical && tabsClasses.flexContainerVertical,
      ownerState.centered && tabsClasses.centered
    ],
    indicator: [tabsClasses.indicator],
    scrollButtons: [
      tabsClasses.scrollButtons,
      ownerState.scrollButtonsHideMobile && tabsClasses.scrollButtonsHideMobile
    ],
    scrollableX: [ownerState.scrollableX && tabsClasses.scrollableX],
    hideScrollbar: [ownerState.hideScrollbar && tabsClasses.hideScrollbar]
  };

  const startScrollButtonIconProps = useSlotProps({
    elementType: slots.StartScrollButtonIcon,
    externalSlotProps: slotProps.startScrollButtonIcon,
    ownerState
  });

  const endScrollButtonIconProps = useSlotProps({
    elementType: slots.EndScrollButtonIcon,
    externalSlotProps: slotProps.endScrollButtonIcon,
    ownerState
  });

  if (process.env.NODE_ENV !== 'production') {
    if (centered && scrollable) {
      console.error(
        'You can not use the `centered={true}` and `variant="scrollable"` properties at the same time on a `Tabs` component.'
      );
    }
  }

  const [mounted, setMounted] = React.useState(false);
  const [indicatorStyle, setIndicatorStyle] = React.useState(defaultIndicatorStyle);
  const [displayStartScroll, setDisplayStartScroll] = React.useState(false);
  const [displayEndScroll, setDisplayEndScroll] = React.useState(false);
  const [displayScroll, setDisplayScroll] = React.useState({
    start: false,
    end: false
  });

  const scrollbarSize = useScrollbarSize(scrollable);

  const [scrollerStyle, setScrollerStyle] = React.useState({
    margin: vertical ? `margin${isRtl ? 'Left' : 'Right'}` : 'marginBottom',
    overflow: 'hidden',
    scrollbarHeight: 0,
    scrollbarWidth: 0
  });

  React.useEffect(() => {
    setScrollerStyle((prevState) => ({
      ...prevState,
      overflow: scrollable ? null : 'hidden',
      scrollbarHeight: scrollbarSize.height,
      scrollbarWidth: scrollbarSize.width
    }));
  }, [scrollable, scrollbarSize]);

  const valueToIndex = new Map();
  const tabsRef = React.useRef(null);
  const tabListRef = React.useRef(null);

  const getTabsMeta = () => {
    const tabsNode = tabsRef.current;
    let tabsMeta;
    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect();
      tabsMeta = {
        clientWidth: tabsNode.clientWidth,
        scrollLeft: tabsNode.scrollLeft,
        scrollTop: tabsNode.scrollTop,
        scrollLeftNormalized: getNormalizedScrollLeft(tabsNode, isRtl ? 'rtl' : 'ltr'),
        scrollWidth: tabsNode.scrollWidth,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right
      };
    }

    let tabMeta;
    if (tabsNode && value !== false) {
      const children = tabListRef.current.children;

      if (children.length > 0) {
        const tab = children[valueToIndex.get(value)];
        if (process.env.NODE_ENV !== 'production') {
          if (!tab) {
            console.error(
              [
                `The \`value\` provided to the Tabs component is invalid.`,
                `None of the Tabs' children match with "${value}".`,
                valueToIndex.keys
                  ? `You can provide one of the following values: ${Array.from(valueToIndex.keys()).join(', ')}.`
                  : null
              ].join('\n')
            );
          }
        }
        tabMeta = tab ? tab.getBoundingClientRect() : null;

        if (process.env.NODE_ENV !== 'production') {
          if (
            process.env.NODE_ENV !== 'test' &&
            !warnedOnceTabPresent &&
            tabMeta &&
            tabMeta.width === 0 &&
            tabMeta.height === 0 &&
            tabsMeta.clientWidth !== 0
          ) {
            tabsMeta = null;
            console.error(
              [
                'The `value` provided to the Tabs component is invalid.',
                `The Tab with this \`value\` ("${value}") is not part of the document layout.`,
                "Make sure the tab item is present in the document or that it's not `display: none`."
              ].join('\n')
            );

            warnedOnceTabPresent = true;
          }
        }
      }
    }
    return { tabsMeta, tabMeta };
  };

  const updateIndicatorState = useEventCallback(() => {
    const { tabsMeta, tabMeta } = getTabsMeta();
    let startValue = 0;
    let startIndicator;

    if (vertical) {
      startIndicator = 'top';
      if (tabMeta && tabsMeta) {
        startValue = tabMeta.top - tabsMeta.top + tabsMeta.scrollTop;
      }
    } else {
      startIndicator = isRtl ? 'right' : 'left';
      if (tabMeta && tabsMeta) {
        const correction = isRtl
          ? tabsMeta.scrollLeftNormalized + tabsMeta.clientWidth - tabsMeta.scrollWidth
          : tabsMeta.scrollLeft;
        startValue = (isRtl ? -1 : 1) * (tabMeta[startIndicator] - tabsMeta[startIndicator] + correction);
      }
    }

    const newIndicatorStyle = {
      [startIndicator]: startValue,
      [size]: tabMeta ? tabMeta[size] : 0
    };

    if (isNaN(indicatorStyle[startIndicator]) || isNaN(indicatorStyle[size])) {
      setIndicatorStyle(newIndicatorStyle);
    } else {
      const dStart = Math.abs(indicatorStyle[startIndicator] - newIndicatorStyle[startIndicator]);
      const dSize = Math.abs(indicatorStyle[size] - newIndicatorStyle[size]);

      if (dStart >= 1 || dSize >= 1) {
        setIndicatorStyle(newIndicatorStyle);
      }
    }
  });

  const scroll = (scrollValue, { animation = true } = {}) => {
    if (animation) {
      animate(scrollStart, tabsRef.current, scrollValue, {
        duration: theme.transition.duration.standard
      });
    } else {
      tabsRef.current[scrollStart] = scrollValue;
    }
  };

  const getScrollSize = () => {
    const containerSize = tabsRef.current[clientSize];
    let totalSize = 0;
    const children = Array.from(tabListRef.current.children);

    for (let i = 0; i < children.length; i += 1) {
      const tab = children[i];
      if (totalSize + tab[clientSize] > containerSize) {
        if (i === 0) {
          totalSize = containerSize;
        }
        break;
      }
      totalSize += tab[clientSize];
    }

    return totalSize;
  };

  const moveTabsScroll = (delta) => {
    let scrollValue = tabsRef.current[scrollStart];

    if (vertical) {
      scrollValue += delta;
    } else {
      scrollValue += delta * (isRtl ? -1 : 1);
      scrollValue *= isRtl && detectScrollType() === 'reverse' ? -1 : 1;
    }

    scroll(scrollValue);
  };

  const handleStartScrollClick = () => {
    moveTabsScroll(-1 * getScrollSize());
  };

  const handleEndScrollClick = () => {
    moveTabsScroll(getScrollSize());
  };

  const getConditionalElements = () => {
    const conditionalElements = {};

    const scrollButtonsActive = displayStartScroll || displayEndScroll;
    const showScrollButtons =
      scrollable && ((scrollButtons === 'auto' && scrollButtonsActive) || scrollButtons === true);

    conditionalElements.scrollButtonStart = showScrollButtons ? (
      <ScrollButtonComponent
        slots={{ StartScrollButtonIcon: slots.StartScrollButtonIcon }}
        slotProps={{ startScrollButtonIcon: startScrollButtonIconProps }}
        orientation={orientation}
        direction={isRtl ? 'right' : 'left'}
        onClick={handleStartScrollClick}
        disabled={!displayStartScroll}
        {...TabScrollButtonProps}
        className={clsx(classes.scrollButtons, TabScrollButtonProps.className)}
      />
    ) : null;

    conditionalElements.scrollButtonEnd = showScrollButtons ? (
      <ScrollButtonComponent
        slots={{ EndScrollButtonIcon: slots.EndScrollButtonIcon }}
        slotProps={{
          endScrollButtonIcon: endScrollButtonIconProps
        }}
        orientation={orientation}
        direction={isRtl ? 'left' : 'right'}
        onClick={handleEndScrollClick}
        disabled={!displayEndScroll}
        {...TabScrollButtonProps}
        className={clsx(classes.scrollButtons, TabScrollButtonProps.className)}
      />
    ) : null;

    return conditionalElements;
  };

  const scrollSelectedIntoView = useEventCallback((animation) => {
    const { tabsMeta, tabMeta } = getTabsMeta();

    if (!tabMeta || !tabsMeta) {
      return;
    }

    if (tabMeta[start] < tabsMeta[start]) {
      const nextScrollStart = tabsMeta[scrollStart] + (tabMeta[start] - tabsMeta[start]);
      scroll(nextScrollStart, { animation });
    } else if (tabMeta[end] > tabsMeta[end]) {
      const nextScrollStart = tabsMeta[scrollStart] + (tabMeta[end] - tabsMeta[end]);
      scroll(nextScrollStart, { animation });
    }
  });

  const updateScrollButtonState = useEventCallback(() => {
    if (scrollable && scrollButtons !== false) {
      const { scrollTop, scrollHeight, clientHeight, scrollWidth, clientWidth } = tabsRef.current;
      let showStartScroll;
      let showEndScroll;

      if (vertical) {
        showStartScroll = scrollTop > 1;
        showEndScroll = scrollTop < scrollHeight - clientHeight - 1;
      } else {
        const scrollLeft = getNormalizedScrollLeft(tabsRef.current, theme.direction);
        showStartScroll = isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
        showEndScroll = !isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
      }

      if (showStartScroll !== displayScroll.start || showEndScroll !== displayScroll.end) {
        setDisplayScroll({ start: showStartScroll, end: showEndScroll });
      }
    }
  });

  React.useEffect(() => {
    const handleResize = debounce(() => {
      updateIndicatorState();
      updateScrollButtonState();
    });

    const win = ownerWindow(tabsRef.current);
    win.addEventListener('resize', handleResize);

    let resizeObserver;

    const handleMutation = (records) => {
      records.forEach((record) => {
        record.removedNodes.forEach((item) => {
          resizeObserver?.unobserve(item);
        });
        record.addedNodes.forEach((item) => {
          resizeObserver?.observe(item);
        });
      });
      handleResize();
      updateScrollButtonState();
    };

    let mutationObserver;

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      Array.from(tabListRef.current.children).forEach((child) => {
        resizeObserver.observe(child);
      });
    }

    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(handleMutation);
      mutationObserver.observe(tabListRef.current, {
        childList: true
      });
    }

    return () => {
      handleResize.clear();
      win.removeEventListener('resize', handleResize);
      mutationObserver?.disconnect();
      resizeObserver?.disconnect();
    };
  }, [updateIndicatorState, updateScrollButtonState]);

  React.useEffect(() => {
    const tabListChildren = Array.from(tabListRef.current.children);
    const length = tabListChildren.length;

    if (typeof IntersectionObserver !== 'undefined' && length > 0 && scrollable && scrollButtons !== false) {
      const firstTab = tabListChildren[0];
      const lastTab = tabListChildren[length - 1];
      const observerOptions = {
        root: tabsRef.current,
        threshold: 0.99
      };

      const handleScrollButtonStart = (entries) => {
        setDisplayStartScroll(!entries[0].isIntersecting);
      };
      const firstObserver = new IntersectionObserver(handleScrollButtonStart, observerOptions);
      firstObserver.observe(firstTab);

      const handleScrollButtonEnd = (entries) => {
        setDisplayEndScroll(!entries[0].isIntersecting);
      };
      const lastObserver = new IntersectionObserver(handleScrollButtonEnd, observerOptions);
      lastObserver.observe(lastTab);

      return () => {
        firstObserver.disconnect();
        lastObserver.disconnect();
      };
    }

    return undefined;
  }, [scrollable, scrollButtons, childrenProp?.length]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    updateIndicatorState();
    updateScrollButtonState();
  });

  React.useEffect(() => {
    scrollSelectedIntoView(defaultIndicatorStyle !== indicatorStyle);
  }, [scrollSelectedIntoView, indicatorStyle]);

  React.useImperativeHandle(
    action,
    () => ({
      updateIndicator: updateIndicatorState,
      updateScrollButtons: updateScrollButtonState
    }),
    [updateIndicatorState, updateScrollButtonState]
  );

  const indicator = (
    <TabsIndicator
      {...TabIndicatorProps}
      className={clsx(classes.indicator, TabIndicatorProps.className)}
      ownerState={ownerState}
      style={{
        ...indicatorStyle,
        ...TabIndicatorProps.style
      }}
    />
  );

  let childIndex = 0;
  const children = React.Children.map(childrenProp, (child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(
          ["The Tabs component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join(
            '\n'
          )
        );
      }
    }

    const childValue = child.props.value === undefined ? childIndex : child.props.value;
    valueToIndex.set(childValue, childIndex);
    const selected = childValue === value;

    childIndex += 1;
    return React.cloneElement(child, {
      fullWidth: variant === 'fullWidth',
      indicator: selected && !mounted && indicator,
      selected,
      selectionFollowsFocus,
      onChange,
      textColor,
      value: childValue,
      ...(childIndex === 1 && value === false && !child.props.tabIndex ? { tabIndex: 0 } : {})
    });
  });

  const handleKeyDown = (event) => {
    const list = tabListRef.current;
    const currentFocus = ownerDocument(list).activeElement;
    // Keyboard navigation assumes that [role="tab"] are siblings
    // though we might warn in the future about nested, interactive elements
    // as a a11y violation
    const role = currentFocus.getAttribute('role');
    if (role !== 'tab') {
      return;
    }

    let previousItemKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    let nextItemKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    if (orientation === 'horizontal' && isRtl) {
      // swap previousItemKey with nextItemKey
      previousItemKey = 'ArrowRight';
      nextItemKey = 'ArrowLeft';
    }

    switch (event.key) {
      case previousItemKey:
        event.preventDefault();
        moveFocus(list, currentFocus, previousItem);
        break;
      case nextItemKey:
        event.preventDefault();
        moveFocus(list, currentFocus, nextItem);
        break;
      case 'Home':
        event.preventDefault();
        moveFocus(list, null, nextItem);
        break;
      case 'End':
        event.preventDefault();
        moveFocus(list, null, previousItem);
        break;
      default:
        break;
    }
  };

  const conditionalElements = getConditionalElements();

  return (
    <TabsRoot className={clsx(classes.root, className)} ownerState={ownerState} ref={ref} as={component} {...other}>
      {conditionalElements.scrollButtonStart}
      <TabsScroller
        className={clsx(classes.scroller)}
        ownerState={ownerState}
        style={{
          overflow: scrollerStyle.overflow,
          [vertical ? `margin${isRtl ? 'Left' : 'Right'}` : 'marginBottom']: visibleScrollbar
            ? undefined
            : -scrollerStyle.scrollbarWidth
        }}
        ref={tabsRef}
      >
        <FlexContainer
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-orientation={orientation === 'vertical' ? 'vertical' : null}
          className={clsx(classes.flexContainer)}
          ownerState={ownerState}
          onKeyDown={handleKeyDown}
          ref={tabListRef}
          role='tablist'
        >
          {children}
        </FlexContainer>
        {mounted && indicator}
      </TabsScroller>
      {conditionalElements.scrollButtonEnd}
    </TabsRoot>
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
