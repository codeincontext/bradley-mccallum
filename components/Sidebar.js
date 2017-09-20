import { Component } from 'react';
import { Link as ScrollLink, scrollSpy } from 'react-scroll';
import {
  fonts,
  weights,
  spacing,
  colors,
  HEADER_HEIGHT,
  SIDEBAR_WIDTH,
} from '~/lib/theme';

// TODO: Assume first item is active if nothing else is yet
// We can use onActive and onInactive for this and store values here
// Can then remove padding on .firstSection in project.js

export default class Sidebar extends Component {
  componentDidMount() {
    setImmediate(() => scrollSpy.update());
  }

  render() {
    const { items } = this.props;

    return (
      <ul>
        {items.map(item => (
          <li key={item.scrollName}>
            <ScrollLink
              to={item.scrollName}
              activeClass="active"
              spy
              isDynamic
              smooth
              duration={500}
              offset={-HEADER_HEIGHT}
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
          }

          li {
            list-style: none;
            margin-bottom: ${spacing.s2};
            text-transform: uppercase;
            font-size: ${fonts.f14};
            position: relative;
            padding-left: ${spacing.s4};
          }

          li :global(.active) {
            font-weight: ${weights.bold};
          }

          li :global(.active):after {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: calc(50% - ${spacing.s05} / 2);
            background: ${colors.black};
            width: ${spacing.s2};
            height: ${spacing.s05};
          }
        `}</style>
      </ul>
    );
  }
}
