import { Component } from 'react';
import { Link as ScrollLink, scrollSpy } from 'react-scroll';
import {
  fonts,
  weights,
  spacing,
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
    const { items, width } = this.props;

    return (
      <ul style={width ? { maxWidth: `${width}px` } : {}}>
        {items.map(item => (
          <li key={item.label}>
            <ScrollLink
              to={item.scrollName}
              activeClass="active-sidebar-link"
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
            left: ${spacing.s2};
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
          }

          :global(.active-sidebar-link) {
            font-weight: ${weights.bold};
          }
        `}</style>
      </ul>
    );
  }
}
