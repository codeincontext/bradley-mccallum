import { colors, spacing } from '~/lib/theme';
import Container from '~/components/Container';

const Divider = () => (
  <div>
    <Container>
      <hr />
    </Container>

    <style jsx>{`
      hr {
        border: none;
        height: 1px;
        width: 100%;
        background-color: ${colors.dividerGrey};
        margin: ${spacing.s2} 0;
      }
    `}</style>
  </div>
);

export default Divider;
