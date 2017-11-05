import PrismicDom from 'prismic-dom';

const RichText = ({ text }) => (
  <span>
    <span
      dangerouslySetInnerHTML={{
        __html: PrismicDom.RichText.asHtml(text)
      }}
    />

    <style jsx>{`
      span :global(a) {
        font-weight: 700;
        text-decoration: underline;
        text-decoration-skip: ink;
      }
    `}</style>
  </span>
);

export default RichText;
