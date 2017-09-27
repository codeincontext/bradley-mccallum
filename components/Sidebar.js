import { Component } from 'react';
import cx from 'classnames';
import { Link as ScrollLink, scrollSpy } from 'react-scroll';
import {
  fonts,
  weights,
  spacing,
  zIndex,
  colors,
  HEADER_HEIGHT,
  SIDEBAR_WIDTH,
} from '~/lib/theme';

// TODO: Assume first item is active if nothing else is yet
// We can use onActive and onInactive for this and store values here
// Can then remove padding on .firstSection in project.js

export default class Sidebar extends Component {
  state = { activeItem: null };

  componentDidMount() {
    setImmediate(() => scrollSpy.update());
  }

  handleSetActive = activeItem => {
    this.setState({ activeItem });
  };

  render() {
    const { items } = this.props;
    const activeItem = this.state.activeItem || items[0];

    return (
      <ul>
        {items.map(item => (
          <li
            className={cx({
              active:
                activeItem === item ||
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
