import cx from 'classnames';

import Image from '~/components/Image';
import Container from '~/components/Container';
import Caption from '~/components/Caption';
import { CONTENT_ITEM_SPACING } from '~/lib/theme';

const SingleImage = ({ item }) => {
  if (!item.image.url) {
    return null;
  }
  const ratio = item.image.dimensions.width / item.image.dimensions.height;
  const portrait = ratio < 1;

  return (
    <Container>
      <figure className={cx('root', { portrait })}>
        <Image image={item.image} />
        <Caption>{item.caption}</Caption>
      </figure>

      <style jsx>{`
        .root {
          margin: 0 0 ${CONTENT_ITEM_SPACING};
        }

        .portrait {
          width: 50%;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </Container>
  );
};

export default SingleImage;
