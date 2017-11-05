import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import { colors } from '~/lib/theme';

const Carousel = ({ children, selectedIndex, onChange }) => (
  <div className="root">
    <ResponsiveCarousel
      axis="horizontal"
      showThumbs={false}
      showIndicators={false}
      showArrows
      showStatus={false}
      onChange={onChange}
      selectedItem={selectedIndex}
      infiniteLoop
    >
      {children}
    </ResponsiveCarousel>

    <style jsx>{`
      // Taken from
      // https://github.com/leandrowd/react-responsive-carousel/blob/master/lib/styles/carousel.css

      .root :global(.carousel) {
        position: relative;
        width: 100%;
        margin: 0;
        overflow: hidden;
        // Establish new stacking context
        opacity: 0.999;
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
        top: calc(50% - (35px / 2));
        height: 35px;
        width: 35px;
        background: ${colors.lightGrey};
        font-size: 35px;
        cursor: pointer;
        padding: 0;
        outline: 0;
        border: 0;
      }

      .root :global(.control-arrow:hover) {
      }

      .root :global(.control-disabled.control-arrow) {
        opacity: 0;
        cursor: inherit;
        display: none;
      }

      .root :global(.control-arrow:before) {
        display: block;
        border-left: 1px solid ${colors.black};
        border-top: 1px solid ${colors.black};
        width: 10px;
        height: 10px;
        content: '';
        transform: translateX(15px) rotate(-45deg) scale(1.4);
      }
      .root :global(.control-prev.control-arrow) {
        left: 0;
      }

      .root :global(.control-next.control-arrow) {
        right: 0;
        transform: scaleX(-1);
      }

      .root :global(img) {
        width: 100%;
        display: inline-block;
        pointer-events: none;
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
      }
      .root :global(.slide img) {
      }
    `}</style>
  </div>
);
export default Carousel;
