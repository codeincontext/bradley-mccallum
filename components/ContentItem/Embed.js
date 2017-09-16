import Container from '~/components/Container';
import Caption from '~/components/Caption';
import { CONTENT_ITEM_SPACING } from '~/lib/theme';

const Embed = ({ item: { embed, caption } }) => {
  return (
    <Container>
      <div className="root">
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: embed.html }}
        />
        <Caption>{caption}</Caption>
      </div>

      <style jsx>{`
        .root {
          margin-bottom: ${CONTENT_ITEM_SPACING};
        }
        .content > :global(*) {
          width: 100%;
        }
      `}</style>
    </Container>
  );
};

export default Embed;
