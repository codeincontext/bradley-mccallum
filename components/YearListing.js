import {
  weights,
  fonts,
  spacing,
  lineHeights,
  letterSpacing,
} from '~/lib/theme';

const YearListing = ({ year, children }) => (
  <li>
    <h3>{year}</h3>
    <ul>{children}</ul>

    <style jsx>{`
      li {
        font-size: ${fonts.f15};
        list-style: none;
        line-height: ${lineHeights.copy};
        margin-bottom: ${spacing.s3};
      }

      ul {
        padding-left: 0;
      }

      h3 {
        margin: 0 0 ${spacing.s05};
        font-size: ${fonts.f15};
        font-weight: ${weights.bold};
        text-transform: uppercase;
        line-height: ${lineHeights.heading};
        letter-spacing: ${letterSpacing.loose};
      }
    `}</style>
  </li>
);

export default YearListing;
