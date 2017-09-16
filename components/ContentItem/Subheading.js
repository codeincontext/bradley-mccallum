import PrismicDom from 'prismic-dom';
import {
  CALLOUT_WIDTH,
  weights,
  fonts,
  spacing,
  lineHeights,
  CONTENT_ITEM_SPACING,
} from '~/lib/theme';
import Container from '~/components/Container';

const Subheading = ({ item }) => (
  <Container>
    <h3>{PrismicDom.RichText.asText(item.text)}</h3>
    <style jsx>{`
      h3 {
        max-width: ${CALLOUT_WIDTH}%;
        margin: 0 auto ${CONTENT_ITEM_SPACING};
        font-size: ${fonts.f30};
        font-weight: ${weights.light};
        text-transform: uppercase;
        text-align: center;
        line-height: ${lineHeights.heading};
        letter-spacing: 0.115em;
      }
    `}</style>
  </Container>
);

export default Subheading;
