import { Carousel } from 'react-responsive-carousel';
import Image from '~/components/Image';
import Container from '~/components/Container';
import RichText from '~/components/RichText';
import { weights, fonts, lineHeights, colors } from '~/lib/theme';

export default class ImageSlider extends React.Component {
  state = { selectedItemId: 0 };

  handleItemChange = (id, item) => {
    this.setState({ selectedItemId: id });
  };

  render() {
    const { item: { items } } = this.props;
    const { selectedItemId } = this.state;

    return (
      <Container>
        <div className="root">
          <Carousel
            axis="horizontal"
            showThumbs={false}
            showArrows
            showStatus={false}
            onChange={this.handleItemChange}
            selectedItem={selectedItemId}
            // TODO: Only works when source image isn't cached
            dynamicHeight
            infiniteLoop
          >
            {items.map(({ image, caption }) => (
              <Image key={image.url} image={image} />
            ))}
          </Carousel>
        </div>

        <div className="caption">
          <RichText text={items[selectedItemId].caption} />
        </div>

        <style jsx>{`
          // Taken from
          // https://github.com/leandrowd/react-responsive-carousel/blob/master/lib/styles/carousel.css

          .root :global(.carousel) {
            position: relative;
            width: 100%;
            margin: 0;
            overflow: hidden;
          }

          .root :global(.carousel *) {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .root :global(.carousel .control-arrow) {
            // transition: all 0.25s ease-in;
            position: absolute;
            z-index: 2;
            top: 50%;
            height: 35px;
            width: 35px;
            background: ${colors.lightGrey};
            font-size: 23px;
            border: 0;
            cursor: pointer;
          }

          .root :global(.control-arrow:hover) {
          }
          .root :global(.control-arrow:before) {
            margin: 0 5px;
            display: inline-block;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            content: '';
          }
          .root :global(.control-disabled.control-arrow) {
            opacity: 0;
            cursor: inherit;
            display: none;
          }
          .root :global(.control-prev.control-arrow) {
            left: 0;
          }
          .root :global(.control-prev.control-arrow:before) {
            border-right: 8px solid ${colors.black};
          }
          .root :global(.control-next.control-arrow) {
            right: 0;
          }
          .root :global(.control-next.control-arrow:before) {
            border-left: 8px solid ${colors.black};
          }
          .root :global(button) {
            outline: 0;
            border: 0;
            background: none;
          }
          .root :global(img) {
            width: 100%;
            display: inline-block;
            pointer-events: none;
          }
          .root :global(.control-arrow) {
            top: 50%;
            margin-top: -13px;
            font-size: 18px;
            top: 0;
            color: #fff;
            font-size: 26px;
            bottom: 0;
            margin-top: 0;
            padding: 5px;
          }

          .root :global(.slider-wrapper) {
            overflow: hidden;
            margin: auto;
            width: 100%;
            transition: height 0.15s ease-in;
          }

          .root :global(.slider) {
            position: relative;
            list-style: none;
            width: 100%;
            padding: 0;

            display: flex;
          }

          .root :global(.slider.animated) {
            transition: all 0.35s ease-in-out;
          }
          .root :global(.slide) {
            flex-direction: column;
            flex-flow: column;

            min-width: 100%;
            margin: 0;
            position: relative;
            text-align: center;
            background: #000;
          }
          .root :global(.slide img) {
            width: 100%;
            vertical-align: top;
            border: 0;
          }

          .root :global(.control-dots) {
            position: absolute;
            bottom: 0;
            margin: 10px 0;
            text-align: center;
            width: 100%;
          }
          .root :global(.control-dots .dot) {
            transition: opacity 0.25s ease-in;
            opacity: 0.3;
            box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
            background: ${colors.lightGrey};
            border-radius: 50%;
            width: 8px;
            height: 8px;
            cursor: pointer;
            display: inline-block;
            margin: 0 8px;
          }
          .root :global(.control-dots .dot.selected),
          .root :global(.control-dots .dot:hover) {
            opacity: 1;
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
