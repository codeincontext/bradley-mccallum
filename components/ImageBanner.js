import Image from "~/components/Image";

export default ({ item }) =>
  <div className="root">
    {item.images.map(image => {
      const { width, height } = image.fields.file.details.image;
      return (
        <div
          className="image"
          style={{ flexGrow: width / height }}
          key={image.sys.id}
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
  </div>;
