import Image from '~/components/Image';
import { CONTENT_ITEM_SPACING } from '~/lib/theme';

const ImageBanner = ({ item }) => (
  <div className="root">
    {item.items.filter(({ image }) => image.url).map(({ image }) => {
      const { width, height } = image.dimensions;
      return (
        <div
          className="image"
          style={{ flexGrow: width / height }}
          key={image.url}
        >
          <Image image={image} />
        </div>
      );
    })}

    <style jsx>{`
      .root {
        width: 100%;
        display: flex;
        // height: 10vw;
        align-items: stretch;
        margin-bottom: ${CONTENT_ITEM_SPACING};
      }
      .image {
        flex-basis: 0;
      }
    `}</style>
  </div>
);

export default ImageBanner;
