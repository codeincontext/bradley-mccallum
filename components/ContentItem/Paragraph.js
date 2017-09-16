import Container from '~/components/Container';
import RichText from '~/components/RichText';
import { lineHeights, fonts, CONTENT_ITEM_SPACING } from '~/lib/theme';

const Paragraph = ({ item }) => (
  <Container>
    <div className="root">
      <RichText text={item.text} />
    </div>
    <style jsx>{`
      .root {
        margin-bottom: ${CONTENT_ITEM_SPACING};
      }

      .root :global(p) {
        font-size: ${fonts.f15};
        line-height: ${lineHeights.copy};
        letter-spacing: 0.1em;
      }
    `}</style>
  </Container>
);

export default Paragraph;
