import { RichText } from "prismic-dom";

export default ({ text }) =>
  <div
    dangerouslySetInnerHTML={{
      __html: RichText.asHtml(text),
    }}
  />;
