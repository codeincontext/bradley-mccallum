import PrismicDom from 'prismic-dom';
import {
  CALLOUT_WIDTH,
  weights,
  fonts,
  spacing,
  lineHeights,
} from '~/lib/theme';
import Container from '~/components/Container';

export default ({ item }) => (
  <Container>
    <h3>{PrismicDom.RichText.asText(item.text)}</h3>
    <style jsx>{`
      h3 {
        max-width: ${CALLOUT_WIDTH}%;
        margin: ${spacing.s3} auto;
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
