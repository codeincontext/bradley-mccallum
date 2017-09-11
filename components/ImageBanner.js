import Image from '~/components/Image';

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
      }
      .image {
        flex-basis: 0;
      }
    `}</style>
  </div>
);

export default ImageBanner;
