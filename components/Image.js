export default ({ image }) =>
  <div>
    <img src={image && image.fields.file.url} />
    <style jsx>{`
      img {
        max-width: 100%;
      }
    `}</style>
  </div>;