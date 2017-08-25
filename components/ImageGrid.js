import { Component } from "react";
import PrismicDom from "prismic-dom";

import Image from "~/components/Image";
import Lightbox from "react-images";
import Container from "~/components/Container";
import { spacing } from "~/components/theme";

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
    const { item: { items } } = this.props;

    return (
      <Container>
        <div className="root">
          {items.map((item, i) => {
            return (
              <div
                className="image"
                // key={image.sys.id}
                onClick={e => this.openLightbox(i, e)}
              >
                <Image image={item.image} />
              </div>
            );
          })}

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
            display: flex;
            flex-wrap: wrap;
            margin-bottom: ${spacing.s2};
          }
          .image:first-of-type {
            margin-left: 0;
          }
          .image {
            width: 12.5%;
            margin-left: 10px;
          }
        `}</style>
      </Container>
    );
  }
}
