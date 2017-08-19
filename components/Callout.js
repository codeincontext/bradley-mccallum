import { CALLOUT_WIDTH } from "~/components/theme";
import Container from "~/components/Container";
import { weights, fonts, spacing } from "~/components/theme";
import RichText from "~/components/RichText";

export default ({ item }) =>
  <Container>
    <blockquote>
      <RichText text={item.text} />
      <style jsx>{`
        blockquote {
          max-width: ${CALLOUT_WIDTH}%;
          margin: ${spacing.s3} auto;
          font-size: ${fonts.f24};
          font-weight: ${weights.bold};
          letter-spacing: 0;
        }
      `}</style>
    </blockquote>
  </Container>;
