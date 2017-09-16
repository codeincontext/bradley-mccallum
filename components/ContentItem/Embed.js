import Container from '~/components/Container';
import { CONTENT_ITEM_SPACING } from '~/lib/theme';

const Embed = ({ item: { embed } }) => {
  return (
    <Container>
      <div className="root" dangerouslySetInnerHTML={{ __html: embed.html }} />

      <style jsx>{`
        .root {
          margin-bottom: ${CONTENT_ITEM_SPACING};
        }
        .root > :global(*) {
          width: 100%;
        }
      `}</style>
    </Container>
  );
};

export default Embed;
