import Image from '~/components/Image';
import Container from '~/components/Container';
import RichText from '~/components/RichText';
import { weights, fonts, lineHeights, CONTENT_ITEM_SPACING } from '~/lib/theme';

const SingleImage = ({ item }) => (
  <Container>
    <figure className="root">
      <Image image={item.image.url} />
      {item.caption && (
        <figcaption>
          <RichText text={item.caption} />
        </figcaption>
      )}
    </figure>
    <style jsx>{`
      .root {
        margin: 0 0 ${CONTENT_ITEM_SPACING};
      }

      figcaption :global(p) {
        font-weight: ${weights.light};
        font-size: ${fonts.f14};
        font-style: italic;
        letter-spacing: 0.1em;
        line-height: ${lineHeights.copy};
      }
    `}</style>
  </Container>
);

export default SingleImage;
