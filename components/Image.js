const Image = ({ image }) => {
  if (!image) return null;

  return (
    <div>
      <img src={image.url} alt={image.alt} />

      <style jsx>{`
        img {
          display: block;
          max-width: 100%;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default Image;
