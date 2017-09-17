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

const Subheading = ({ item: { type, text } }) => (
  <Container>
    <div
      className="root"
      dangerouslySetInnerHTML={{ __html: PrismicDom.RichText.asHtml(text) }}
    />

    <style jsx>{`
      .root > :global(h3),
      .root > :global(h4) {
        text-transform: uppercase;
        line-height: ${lineHeights.heading};
        letter-spacing: 0.115em;
      }

      .root > :global(h3) {
        margin: 0 auto ${CONTENT_ITEM_SPACING};
        max-width: ${CALLOUT_WIDTH}%;
        font-size: ${fonts.f30};
        font-weight: ${weights.light};
        text-align: center;
      }

      .root > :global(h4) {
        margin: 0 auto ${spacing.s1};
        font-size: ${fonts.f15};
        font-weight: ${weights.bold};
      }
    `}</style>
  </Container>
);

export default Subheading;
