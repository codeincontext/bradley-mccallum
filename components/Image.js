import { fonts } from "~/components/theme";

export default ({ image }) =>
  <div>
    <img src={image && image.fields.file.url} alt={image.fields.title} />

    <style jsx>{`
      img {
        max-width: 100%;
        margin: 0;
      }
    `}</style>
  </div>;
