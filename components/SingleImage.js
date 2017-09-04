import Image from '~/components/Image';
import Container from '~/components/Container';
import RichText from '~/components/RichText';
import { weights, fonts, lineHeights } from '~/lib/theme';

export default ({ item }) => (
  <Container>
    <figure>
      <Image image={item.image.url} />
      {item.caption && (
        <figcaption>
          <RichText text={item.caption} />
        </figcaption>
      )}
    </figure>
    <style jsx>{`
      figure {
        margin: 0;
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
