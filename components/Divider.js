import { colors, spacing } from '~/lib/theme';
import Container from '~/components/Container';

export default () => (
  <div>
    <Container>
      <hr />
    </Container>

    <style jsx>{`
      hr {
        border: none;
        width: 100%;
        height: 1px;
        background-color: ${colors.dividerGrey};
        margin: ${spacing.s2} 0;
      }
    `}</style>
  </div>
);
