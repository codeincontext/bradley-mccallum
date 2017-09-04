import PrismicDom from 'prismic-dom';

const RichText = ({ text }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: PrismicDom.RichText.asHtml(text),
    }}
  />
);

export default RichText;
