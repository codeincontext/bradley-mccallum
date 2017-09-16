import PrismicDom from 'prismic-dom';
import Container from '~/components/Container';
import ContentItem from '~/components/ContentItem';
import { fonts, weights } from '~/lib/theme';

const Exhibition = ({ exhibition: { title, venue, location, date, body } }) => (
  <div>
    <Container>
      <h2>{PrismicDom.RichText.asText(title)}</h2>
      <div className="intro">
        <p>
          {venue}, {location}
        </p>
        <p className="year">{new Date(date).getFullYear()}</p>
      </div>
    </Container>

    {(body || [])
      .map((contentItem, i) => <ContentItem item={contentItem} key={i} />)}

    <style jsx>{`
      h2 {
        font-size: ${fonts.f24};
      }

      .intro {
        font-size: ${fonts.f14};
      }

      .year {
        font-weight: ${weights.bold};
      }
    `}</style>
  </div>
);

export default Exhibition;