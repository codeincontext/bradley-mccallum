import Image from '~/components/Image';
import { CONTENT_ITEM_SPACING } from '~/lib/theme';

const BANNER_HEIGHT = 250;

const BannerImage = ({ image, totalWidth }) => {
  const { width, height } = image.dimensions;
  return (
    <div className="root">
      <Image image={image} />
      <style jsx>{`
        /*
          By default images have a fixed size and therefore the banner has a fixed width
          It looks strange if the window size is similar to the banner width: there's a small scrollbar or a small gap.

          Use MQs to prevent this:
          - Window thinner than banner: Set correct width for 250px height
          - Window is close to the ideal banner size: Use flexbox to fit to size
          - Window wider than banner: Set correct width for 250px height
        */
        .root {
          width: ${width / height * BANNER_HEIGHT}px;
        }

        @media (min-width: ${totalWidth * 0.9}px) {
          .root {
            width: auto;
            flex-basis: 0;
            flex-grow: ${width / height};
          }
        }

        @media (min-width: ${totalWidth * 1.1}px) {
          .root {
            width: ${width / height * BANNER_HEIGHT}px;
            flex-basis: initial;
            flex-grow: initial;
          }
        }
      `}</style>
    </div>
  );
};

const ImageBanner = ({ item }) => {
  const images = item.items
    .map(({ image }) => image)
    .filter(image => image.url);

  const totalWidth = images.reduce(
    (total, image) =>
      total + image.dimensions.width / image.dimensions.height * BANNER_HEIGHT,
    0
  );

  return (
    <div className="root">
      {images.map(image => (
        <BannerImage image={image} totalWidth={totalWidth} key={image.url} />
      ))}

      <style jsx>{`
        .root {
          display: flex;
          overflow-x: auto;
          margin-bottom: ${CONTENT_ITEM_SPACING};
        }
        .image {
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};

export default ImageBanner;
