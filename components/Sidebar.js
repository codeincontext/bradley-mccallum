import { Component } from "react";
import { Link, scrollSpy } from "react-scroll";
import { weights, spacing } from "~/components/theme";

// TODO: Assume first item is active if nothing else is yet
// We can use onActive and onInactive for this and store values here
// Can then remove padding on .firstSection in project.js

export default class extends Component {
  componentDidMount() {
    setImmediate(() => scrollSpy.update());
  }

  render() {
    const { items } = this.props;

    return (
      <ul>
        {items.map(item =>
          <li key={item.label}>
            <Link
              to={item.scrollName}
              activeClass="active-sidebar-link"
              spy
              smooth
              duration={500}
            >
              {item.label}
            </Link>
          </li>
        )}

        <style jsx>{`
          ul {
            position: fixed;
            left: ${spacing.s2};
            top: ${spacing.s3};
            margin: 0;
            padding: 0;
          }

          li {
            list-style: none;
          }

          :global(.active-sidebar-link) {
            font-weight: ${weights.bold};
          }
        `}</style>
      </ul>
    );
  }
}