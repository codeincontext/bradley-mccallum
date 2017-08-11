import { Component } from "react";
import Image from "~/components/Image";
import Lightbox from "react-images";
import Container from "~/components/Container";

// We can either define a number of columns or a minimum image size a-la https://github.com/neptunian/react-photo-gallery#user-guide--best-practice

export default class ImageGrid extends Component {
  constructor(props) {
    super();
  }

  state = {};

  openLightbox = () => {
    this.setState({ lightboxIsOpen: true });
  };

  closeLightbox = () => {
    this.setState({ lightboxIsOpen: false });
  };

  // goToPrevious = () => {};

  // goToNext = () => {};

  render() {
    const { item: { images } } = this.props;

    return (
      <Container>
        <div className="root">
          {images.map(image => {
            return (
              <div
                className="image"
                key={image.sys.id}
                onClick={this.openLightbox}
              >
                <Image image={image} />
              </div>
            );
          })}

          <Lightbox
            images={images.map(image => ({ src: image.fields.file.url }))}
            isOpen={this.state.lightboxIsOpen}
            // currentImage={this.state.currentImage}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            onClose={this.closeLightbox}
          />
        </div>

        <style jsx>{`
          .root {
            display: flex;
            flex-wrap: wrap;
          }
          .image {
            width: 25%;
          }
        `}</style>
      </Container>
    );
  }
}
