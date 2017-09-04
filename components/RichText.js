import { RichText } from 'prismic-dom';

export default ({ text }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: RichText.asHtml(text),
    }}
  />
);
