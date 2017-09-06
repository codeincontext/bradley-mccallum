import { fonts, colors, weights, spacing } from '~/lib/theme';

const MainHeading = ({ children }) => (
  <div className="heading">
    <h1>{children}</h1>

    <style jsx>{`
      .heading {
        background: radial-gradient(${colors.black} 15%, transparent 16%),
          radial-gradient(${colors.black} 15%, transparent 16%),
          ${colors.lightGrey};
        background-size: 7px 7px;
        padding-top: ${spacing.s2};
        margin-bottom: ${spacing.s2};
      }
      .heading h1 {
        font-weight: ${weights.light};
        font-size: ${fonts.f24};
        text-transform: uppercase;
        letter-spacing: 2px;
        display: inline-block;
        margin: 0;
        padding: ${spacing.s05} ${spacing.s1} 0 ${spacing.s025};
        background-color: ${colors.lightGrey};
      }
    `}</style>
  </div>
);

export default MainHeading;
