import PrismicDom from 'prismic-dom';
import Container from '~/components/Container';
import ContentItem from '~/components/ContentItem';
import {
  fonts,
  weights,
  HEADER_HEIGHT,
  spacing,
  CONTENT_ITEM_SPACING,
} from '~/lib/theme';

const Exhibition = ({
  exhibition: { title, venue, location, date, body, uid },
}) => (
  <section>
    <div className="hash-anchor" id={uid} />
    <Container>
      <h2>{PrismicDom.RichText.asText(title)}</h2>
      <div className="intro">
        <p>
          {venue}, {location}
        </p>
        <p className="year">{new Date(date).getFullYear()}</p>
      </div>
    </Container>

    {(body || []).map((contentItem, i) => (
      <ContentItem item={contentItem} key={i} />
    ))}

    <style jsx>{`
      section {
        // So we can position the hash anchor above the section
        position: relative;
      }

      .hash-anchor {
        position: absolute;
        top: -${HEADER_HEIGHT}px;
      }

      h2 {
        font-size: ${fonts.f24};
        margin: ${spacing.s1} 0;
      }

      .intro {
        font-size: ${fonts.f14};
        margin-bottom: ${CONTENT_ITEM_SPACING};
      }

      .year {
        font-weight: ${weights.bold};
      }

      p {
        margin: ${spacing.s1} 0;
      }
    `}</style>
  </section>
);

export default Exhibition;
