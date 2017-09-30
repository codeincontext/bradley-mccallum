import RichText from '~/components/RichText';
import { fonts, weights, lineHeights } from '~/lib/theme';

const Caption = ({ children }) => {
  if (!children) return null;

  return (
    <div>
      <figcaption className="root">
        <RichText text={children} />
      </figcaption>

      <style jsx>{`
        .root :global(p) {
          font-weight: ${weights.light};
          font-size: ${fonts.f14};
          font-style: italic;
          line-height: ${lineHeights.copy};
        }
      `}</style>
    </div>
  );
};

export default Caption;
