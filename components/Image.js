const Image = ({ image }) => {
  if (!image || !Object.keys(image).length) return null;
  const { url, alt, dimensions } = image;

  return (
    <div
      className="root"
      style={{ paddingTop: `${dimensions.height / dimensions.width * 100}%` }}
    >
      <img src={image.url} alt={image.alt} />

      <style jsx>{`
        .root {
          position: relative;
        }

        img {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Image;
