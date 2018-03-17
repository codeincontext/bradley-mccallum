const Image = ({ image }) => {
  if (!image || !Object.keys(image).length) return null;
  const { url, alt, dimensions } = image;

  return (
    <div className="root">
      <img src={url} alt={alt} />

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

      <style jsx>{`
        .root {
          paddingtop: ${dimensions.height / dimensions.width * 100}%;
        }
      `}</style>
    </div>
  );
};

export default Image;
