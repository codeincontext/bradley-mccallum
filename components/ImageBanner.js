import Image from "~/components/Image";

export default ({ item }) =>
  <div className="root">
    {item.images.map(image =>
      <div
        className="image"
        style={{
          flexGrow:
            image.fields.file.details.image.width /
            image.fields.file.details.image.height,
        }}
      >
        <Image image={image} />
      </div>
    )}

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
