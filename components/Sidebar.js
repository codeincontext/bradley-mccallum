import { Component } from 'react';
import { Link as ScrollLink, scrollSpy } from 'react-scroll';
import debounce from 'lodash.debounce';

import {
  fonts,
  weights,
  spacing,
  zIndex,
  colors,
  SCROLL_OFFSET,
  SCROLL_DURATION,
  SIDEBAR_WIDTH,
  letterSpacing,
  HEADER_HEIGHT,
  PAGE_TOP_PADDING,
} from '~/lib/theme';

const DEBOUNCE_INTERVAL = 100;

const Item = ({ item, active, isChild }) => {
  const showUnderline = active && !isChild;
  return (
    <li>
      <ScrollLink
        to={item.scrollName}
        spy
        isDynamic
        smooth
        duration={SCROLL_DURATION}
        offset={SCROLL_OFFSET}
        onSetActive={() => this.handleSetActive(item)}
      >
        {item.label}
      </ScrollLink>

      <style jsx>{`
        li {
          list-style: none;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          font-size: ${fonts.f14};
          position: relative;
          padding-left: ${spacing.s4};
          cursor: pointer;

          ${isChild &&
            `
            margin-left: ${spacing.s2};
            font-size: ${fonts.f12};
            text-transform: initial;
            margin-top: -${spacing.s025};
            ${isActive &&
              `
              font-weight: ${weights.regular};
              font-style: italic;
            `}
          `} ${!isChild &&
            isActive &&
            `
            font-weight: ${weights.bold};
          `};
        }

        ${!isChild &&
          isActive &&
          `
          li:after {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: ${spacing.s025};
            background: ${colors.black};
            width: ${spacing.s2};
            height: ${spacing.s05};
          }
        `} li :global(a) {
          letter-spacing: ${letterSpacing.tight};
        }
      `}</style>
    </li>
  );
};

export default class Sidebar extends Component {
  state = { activeItem: null, atBottom: false };

  constructor(props) {
    super(props);

    this.handleOnScroll = debounce(
      this.handleOnScroll.bind(this),
      DEBOUNCE_INTERVAL,
      {
        trailing: true,
      }
    );
  }

  componentDidMount() {
    setImmediate(() => scrollSpy.update());
    document.addEventListener('scroll', this.handleOnScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleOnScroll);
  }

  handleOnScroll() {
    const atBottom =
      document.body.scrollHeight <= window.scrollY + window.innerHeight;

    if (atBottom !== this.state.atBottom) {
      this.setState({ atBottom });
    }
  }

  handleSetActive = activeItem => {
    this.setState({ activeItem });
  };

  render() {
    const { items, hidden } = this.props;
    const activeItem = this.state.atBottom
      ? items[items.length - 1]
      : this.state.activeItem || items[0];

    return (
      <ul>
        {items.map(item => (
          <Item
            item={item}
            active={
              activeItem.scrollName === item.scrollName ||
              activeItem.parentName === item.scrollName
            }
            isChild={!!item.parentName}
            key={item.scrollName}
          />
        ))}

        <style jsx>{`
          ul {
            position: fixed;
            left: 0;
            top: ${HEADER_HEIGHT + PAGE_TOP_PADDING}px;
            width: ${SIDEBAR_WIDTH}px;
            margin: 0;
            padding: 0;
            z-index: ${zIndex.sidebar};
            transition: opacity 0.25s ease-in;
          }
        `}</style>

        <style jsx>{`
          ul {
            opacity: ${hidden ? 0 : 1};
          }
        `}</style>
      </ul>
    );
  }
}
