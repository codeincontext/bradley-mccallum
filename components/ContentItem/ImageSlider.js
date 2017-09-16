import Image from '~/components/Image';
import Container from '~/components/Container';
import RichText from '~/components/RichText';
import Carousel from '~/components/Carousel';
import { weights, fonts, lineHeights, CONTENT_ITEM_SPACING } from '~/lib/theme';

export default class ImageSlider extends React.Component {
  state = { selectedIndex: 0 };

  handleIndexChange = (id, item) => {
    this.setState({ selectedIndex: id });
  };

  render() {
    const { item: { items } } = this.props;
    const { selectedIndex } = this.state;

    return (
      <Container>
        <div className="root">
          <Carousel
            onChange={this.handleIndexChange}
            selectedIndex={selectedIndex}
          >
            {items
              .filter(({ image }) => image.url)
              .map(({ image }) => <Image key={image.url} image={image} />)}
          </Carousel>

          <div className="caption">
            <RichText text={items[selectedIndex].caption} />
          </div>
        </div>

        <style jsx>{`
          .root {
            margin-bottom: ${CONTENT_ITEM_SPACING};
          }

          .caption :global(p) {
            // copies SingleImage.js
            font-weight: ${weights.light};
            font-size: ${fonts.f14};
            font-style: italic;
            letter-spacing: 0.1em;
            line-height: ${lineHeights.copy};
          }
        `}</style>
      </Container>
    );
  }
}
