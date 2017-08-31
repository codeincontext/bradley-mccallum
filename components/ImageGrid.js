import { Component } from 'react';
import PrismicDom from 'prismic-dom';

import Image from '~/components/Image';
import Lightbox from 'react-images';
import Container from '~/components/Container';
import { spacing } from '~/lib/theme';

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
            {items.map((item, i) => (
              <div
                className="image"
                style={{ flexBasis: min_width }}
                // key={image.sys.id}
                onClick={e => this.openLightbox(i, e)}
              >
                <Image image={item.image} />
              </div>
            ))}
            {/* We want images on all lines to have the same width.
              If the last line has fewer items, flex-griw will try to grow them
              Adding 0 height elements to the end preents this
          */}
            {Array.from({ length: 10 }).map(i => (
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
          />
        </div>

        <style jsx>{`
          .root {
            margin-bottom: ${spacing.s2};
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
          }
          .spacer {
            height: 0;
          }
        `}</style>
      </Container>
    );
  }
}
