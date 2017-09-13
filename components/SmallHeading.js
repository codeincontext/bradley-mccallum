import { weights, fonts, spacing, lineHeights } from '~/lib/theme';

const SmallHeading = ({ children }) => (
  <div>
    <h3>{children}</h3>
    <style jsx>{`
      h3 {
        font-size: ${fonts.f20};
        font-weight: ${weights.light};
        text-transform: uppercase;
        line-height: ${lineHeights.heading};
        letter-spacing: 0.115em;
      }
    `}</style>
  </div>
);

export default SmallHeading;
