import { Component } from 'react';
import PrismicDom from 'prismic-dom';

import Image from '~/components/Image';
import Lightbox from 'react-images';
import Container from '~/components/Container';
import { spacing, colors, CONTENT_ITEM_SPACING } from '~/lib/theme';

const LIGHTBOX_THEME = {
  container: {
    background: colors.white,
  },

  arrow: {
    background: 'none',
    fill: colors.black,
  },
  // arrow__size__medium: {
  // },
  // arrow__direction__left: {},
  // arrow__direction__right: {},
  header: {},
  close: {
    fill: colors.black,
    position: 'fixed',
    right: 45,
    top: 32,
  },

  footer: {
    color: colors.black,
    height: 100,
  },
};

// We can either define a number of columns or a minimum image size a-la https://github.com/neptunian/react-photo-gallery#user-guide--best-practice

export default class ImageGrid extends Component {
  constructor(props) {
    super();
  }

  state = {
    currentImage: 0,
    lightboxIsOpen: false,
  };

  openLightbox = index => {
    this.setState({ lightboxIsOpen: true, currentImage: index });
  };

  closeLightbox = () => {
    this.setState({ lightboxIsOpen: false });
  };

  goToPrevious = () => {
    this.setState({ currentImage: this.state.currentImage - 1 });
  };

  goToNext = () => {
    this.setState({ currentImage: this.state.currentImage + 1 });
  };

  render() {
    const { item: { items, min_width = '100px' } } = this.props;

    return (
      <Container>
        <div className="root">
          <div className="images">
            {items.filter(({ image }) => image.url).map(({ image }, i) => (
              <div
                className="image"
                style={{ flexBasis: min_width }}
                key={image.url}
                onClick={e => this.openLightbox(i, e)}
              >
                <Image image={image.thumbnail} />
              </div>
            ))}
            {/* We want images on all rows to have the same size.
              By default, if the last row has fewer items than the rows above,
              flex-grow will expand them to fill the space.
              Adding spacer elements makes sure that the last row matches the other rows */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                className="image spacer"
                style={{ flexBasis: min_width }}
                key={i}
              />
            ))}
          </div>

          <Lightbox
            images={items.map(item => ({
              src: item.image.url,
              caption: PrismicDom.RichText.asText(item.caption),
            }))}
            isOpen={this.state.lightboxIsOpen}
            currentImage={this.state.currentImage}
            onClickPrev={this.goToPrevious}
            onClickNext={this.goToNext}
            onClose={this.closeLightbox}
            // backdropClosesModal
            theme={LIGHTBOX_THEME}
          />
        </div>

        <style jsx>{`
          .root {
            margin-bottom: ${CONTENT_ITEM_SPACING};
          }
          .images {
            margin: -5px;
            display: flex;
            flex-wrap: wrap;
          }
          .image {
            flex-grow: 1;
            flex-shrink: 0;
            margin: 5px;
            cursor: pointer;
          }
          .spacer {
            height: 0;
            margin: 0 5px;
          }
        `}</style>
      </Container>
    );
  }
}
