import Container from '~/components/Container';
import {
  CALLOUT_WIDTH,
  weights,
  fonts,
  spacing,
  lineHeights,
} from '~/lib/theme';
import RichText from '~/components/RichText';

const Callout = ({ item }) => (
  <Container>
    <blockquote>
      <RichText text={item.text} />
      <style jsx>{`
        blockquote {
          max-width: ${CALLOUT_WIDTH}%;
          margin: ${spacing.s3} auto;
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
