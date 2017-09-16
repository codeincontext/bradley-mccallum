import Image from '~/components/Image';
import Container from '~/components/Container';
import Caption from '~/components/Caption';
import { CONTENT_ITEM_SPACING } from '~/lib/theme';

const SingleImage = ({ item }) => (
  <Container>
    <figure className="root">
      <Image image={item.image} />
      <Caption>{item.caption}</Caption>
    </figure>

    <style jsx>{`
      .root {
        margin: 0 0 ${CONTENT_ITEM_SPACING};
      }
    `}</style>
  </Container>
);

export default SingleImage;
