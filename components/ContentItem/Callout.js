import Container from '~/components/Container';
import {
  CALLOUT_WIDTH,
  weights,
  fonts,
  spacing,
  lineHeights,
  CONTENT_ITEM_SPACING,
} from '~/lib/theme';
import RichText from '~/components/RichText';

const Callout = ({ item }) => (
  <Container>
    <blockquote className="root">
      <RichText text={item.text} />
      <style jsx>{`
        .root {
          max-width: ${CALLOUT_WIDTH}%;
          margin: 0 auto ${CONTENT_ITEM_SPACING};
          font-size: ${fonts.f24};
          font-weight: ${weights.bold};
          line-height: ${lineHeights.heading};
          letter-spacing: 2px;
        }
      `}</style>
    </blockquote>
  </Container>
);

export default Callout;
