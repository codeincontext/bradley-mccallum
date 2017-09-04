import { colors, spacing } from '~/lib/theme';
import Container from '~/components/Container';

export default () => (
  <div>
    <Container>
      <hr />
    </Container>

    <style jsx>{`
      hr {
        border-top: 1px solid ${colors.dividerGrey};
        width: 100%;
        margin: ${spacing.s2} 0;
      }
    `}</style>
  </div>
);
