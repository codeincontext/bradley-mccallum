import Container from '~/components/Container';
import {
  fonts,
  colors,
  weights,
  spacing,
  CONTENT_ITEM_SPACING,
} from '~/lib/theme';

const MainHeading = ({ children }) => (
  <div className="root">
    <Container>
      <div className="heading">{children}</div>
    </Container>

    <style jsx>{`
      .root {
        margin-top: calc(${CONTENT_ITEM_SPACING} + 1rem);
        overflow-x: hidden;
      }

      .heading {
        position: relative;
        padding-top: ${spacing.s4};
        margin-bottom: ${spacing.s2};
      }

      .heading:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: -50vw;
        bottom: 0;
        left: 0;
        z-index: -1;

        background: radial-gradient(${colors.black} 15%, transparent 20%),
          ${colors.lightGrey};
        background-size: 5px 5px;
      }

      .heading > :global(h1),
      .heading > :global(h2) {
        font-weight: ${weights.light};
        font-size: ${fonts.f30};
        text-transform: uppercase;
        letter-spacing: 2px;
        display: inline-block;
        margin: 0;
        padding: ${spacing.s1} 1.25rem 0 0;
        background-color: ${colors.lightGrey};
      }
    `}</style>
  </div>
);

export default MainHeading;
