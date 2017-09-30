import { weights, fonts, lineHeights, letterSpacing } from '~/lib/theme';
import Container from '~/components/Container';

const SmallHeading = ({ children }) => (
  <Container>
    <h3>{children}</h3>
    <style jsx>{`
      h3 {
        font-size: ${fonts.f20};
        font-weight: ${weights.light};
        text-transform: uppercase;
        line-height: ${lineHeights.heading};
        letter-spacing: ${letterSpacing.loose};
      }
    `}</style>
  </Container>
);

export default SmallHeading;
