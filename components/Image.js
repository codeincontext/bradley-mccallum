import { fonts } from "~/components/theme";

export default ({ image }) => {
  if (!image) return null;

  return (
    <div>
      <img src={image.url} alt={image.alt} />

      <style jsx>{`
        img {
          max-width: 100%;
          margin: 0;
        }
      `}</style>
    </div>
  );
};
