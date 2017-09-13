import { weights, fonts, spacing, lineHeights } from '~/lib/theme';

const YearListingItem = ({ children }) => (
  <li>
    {children}

    <style jsx>{`
      li {
        font-size: ${fonts.f15};
        list-style: none;
        line-height: ${lineHeights.copy};
        margin-bottom: ${spacing.s05};
      }

      li :global(a) {
        font-weight: ${weights.bold};
        text-decoration: underline;
        text-decoration-skip: ink;
      }
    `}</style>
  </li>
);

export default YearListingItem;
