import { colors, spacing, CONTENT_ITEM_SPACING } from '~/lib/theme';
import Container from '~/components/Container';

const Divider = () => (
  <Container>
    <hr className="root" />

    <style jsx>{`
      .root {
        border: none;
        height: 1px;
        width: 100%;
        background-color: ${colors.dividerGrey};
        margin: 0 auto ${CONTENT_ITEM_SPACING};
      }
    `}</style>
  </Container>
);

export default Divider;
