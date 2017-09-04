import Container from '~/components/Container';
import RichText from '~/components/RichText';
import { lineHeights, fonts } from '~/lib/theme';

export default ({ item }) => (
  <Container>
    <div>
      <RichText text={item.text} />
    </div>
    <style jsx>{`
      div :global(p) {
        font-size: ${fonts.f15};
        line-height: ${lineHeights.copy};
        letter-spacing: 0.1em;
      }
    `}</style>
  </Container>
);
