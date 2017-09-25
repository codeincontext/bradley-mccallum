import PrismicDom from 'prismic-dom';
import Link from 'next/link';
import cx from 'classnames';

import Image from '~/components/Image';
import RichText from '~/components/RichText';
import Carousel from '~/components/Carousel';
import {
  weights,
  fonts,
  lineHeights,
  colors,
  spacing,
  HEADER_HEIGHT,
} from '~/lib/theme';

const FOOTER_HEIGHT = 52;

export default class FeaturedProjectCarousel extends React.Component {
  state = { selectedIndex: 0 };

  handleIndexChange = (id, item) => {
    this.setState({ selectedIndex: id });
  };

  handleDotClick = e => {
    const selectedIndex = e.target.value;
    this.setState({ selectedIndex });
  };

  render() {
    const { features } = this.props;
    const { selectedIndex } = this.state;
    const selectedProject = features[selectedIndex].project;

    return (
      <div className="root">
        <Carousel
          onChange={this.handleIndexChange}
          selectedIndex={selectedIndex}
          showIndicators={false}
        >
          {features
            .filter(({ image, project }) => image && project.uid)
            .map(({ image, project }, i) => (
              <Link
                as={`/project/${project.uid}`} // URL exposed to the browser
                href={`/project?slug=${project.uid}`} // simplified URL for next.js client routing
                prefetch={i === 0}
                key={project.uid}
              >
                <a
                  className="item"
                  style={{ backgroundImage: `url(${image.url})` }}
                />
              </Link>
            ))}
        </Carousel>

        <footer>
          <ul className="control-dots">
            {features.map((item, i) => (
              <li
                className={cx('dot', {
                  selected: i === this.state.selectedIndex,
                })}
                onClick={this.handleDotClick}
                value={i}
                key={i}
              />
            ))}
          </ul>

          <Link
            as={`/project/${selectedProject.uid}`} // URL exposed to the browser
            href={`/project?slug=${selectedProject.uid}`} // simplified URL for next.js client routing
            key={selectedProject.id}
          >
            <a className="tab">
              <div className="year">
                {selectedProject.year_text ||
                  new Date(selectedProject.date).getFullYear()}
              </div>
              <div className="title">
                {PrismicDom.RichText.asText(selectedProject.title)}
              </div>
            </a>
          </Link>
        </footer>

        <style jsx>{`
          .root {
            opacity: 0.999;
            margin-bottom: ${spacing.s3};
          }

          .item {
            display: block;
            background-size: cover;
            background-position: center;
            height: calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px);
          }

          footer {
            position: relative;
            height: ${FOOTER_HEIGHT}px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .control-dots {
            padding-left: 0;
            margin: 0;
            display: flex;
            justify-content: center;
          }
          .dot {
            transition: opacity 0.25s ease-in;
            opacity: 0.3;
            box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
            background: ${colors.midGrey};
            border-radius: 50%;
            width: 8px;
            height: 8px;
            cursor: pointer;
            margin: 0 8px;
            list-style: none;
          }
          .dot.selected,
          .dot:hover {
            opacity: 1;
          }

          .tab {
            position: absolute;
            right: 0;
            bottom: 0;
            z-index: 1;
            background: ${colors.lightGrey};
            padding: ${spacing.s1} 25px 20px;
          }

          .year {
            font-size: ${fonts.f16};
            font-weight: ${weights.bold};
            letter-spacing: 0.1em;
            line-height: ${lineHeights.heading};
            margin-bottom: 8px;
          }

          .title {
            line-height: ${lineHeights.heading};
            font-weight: ${weights.light};
            font-size: ${fonts.f20};
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
        `}</style>
      </div>
    );
  }
}
