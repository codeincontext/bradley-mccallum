import { Component } from 'react';
import cx from 'classnames';
import { Link as ScrollLink, scrollSpy } from 'react-scroll';
import debounce from 'lodash.debounce';

import {
  fonts,
  weights,
  spacing,
  zIndex,
  colors,
  HEADER_HEIGHT,
  SIDEBAR_WIDTH,
} from '~/lib/theme';

const DEBOUNCE_INTERVAL = 100;

export default class Sidebar extends Component {
  state = { activeItem: null, atBottom: false };

  constructor(props) {
    super(props);

    this.handleOnScroll = debounce(
      this.handleOnScroll.bind(this),
      DEBOUNCE_INTERVAL,
      { trailing: true }
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
    const { items } = this.props;
    const activeItem = this.state.atBottom
      ? items[items.length - 1]
      : this.state.activeItem || items[0];

    return (
      <ul>
        {items.map(item => (
          <li
            className={cx({
              active:
                activeItem.scrollName === item.scrollName ||
                activeItem.parentName === item.scrollName,
              'is-child': !!item.parentName,
            })}
            key={item.scrollName}
          >
            <ScrollLink
              to={item.scrollName}
              spy
              isDynamic
              smooth
              duration={500}
              offset={-HEADER_HEIGHT}
              onSetActive={() => this.handleSetActive(item)}
            >
              {item.label}
            </ScrollLink>
          </li>
        ))}

        <style jsx>{`
          ul {
            position: fixed;
            left: 0;
            top: ${spacing.s8};
            width: ${SIDEBAR_WIDTH}px;
            margin: 0;
            padding: 0;
            z-index: ${zIndex.sidebar};
          }

          li {
            list-style: none;
            margin-bottom: 1.5rem;
            text-transform: uppercase;
            font-size: ${fonts.f14};
            position: relative;
            padding-left: ${spacing.s4};
            cursor: pointer;
          }

          li.is-child {
            margin-left: ${spacing.s2};
            font-size: ${fonts.f12};
            text-transform: initial;
            margin-top: -${spacing.s05};
          }

          li.active:not(.is-child) {
            font-weight: ${weights.bold};
          }

          li.active:not(.is-child):after {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: calc(50% - ${spacing.s05} / 2);
            background: ${colors.black};
            width: ${spacing.s2};
            height: ${spacing.s05};
          }

          li.active.is-child {
            font-weight: ${weights.regular};
            font-style: italic;
          }
        `}</style>
      </ul>
    );
  }
}
