import Image from '~/components/Image';
import Container from '~/components/Container';
import RichText from '~/components/RichText';
import { weights, fonts, lineHeights } from '~/lib/theme';

export default ({ item }) => (
  <Container>
    <Image image={item.image.url} />
    <div className="caption">
      <RichText text={item.caption} />
    </div>
    <style jsx>{`
      .caption :global(p) {
        font-weight: ${weights.light};
        font-size: ${fonts.f14};
        font-style: italic;
        letter-spacing: 0.1em;
        line-height: ${lineHeights.copy};
      }
    `}</style>
  </Container>
);
