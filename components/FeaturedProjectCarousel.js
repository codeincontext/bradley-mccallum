import PrismicDom from 'prismic-dom';
import Link from 'next/link';

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

const Item = ({ image, project, prefetch }) => (
  <Link
    as={`/project/${project.uid}`} // URL exposed to the browser
    href={`/project?slug=${project.uid}`} // simplified URL for next.js client routing
    prefetch={prefetch}
  >
    <a className="root" />

    <style jsx>{`
      .root {
        display: block;
        background-size: cover;
        background-position: center;
        height: calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px);
      }
    `}</style>

    <style jsx>{`
      .root {
        backgroundimage: url(${image.url});
      }
    `}</style>
  </Link>
);

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
        >
          {features
            .filter(({ image, project }) => image && project.uid)
            .map(({ image, project }, i) => (
              <Item image={image} key={project.uid} prefetch={i === 0} />
            ))}
        </Carousel>

        <footer>
          <Link
            as={`/project/${selectedProject.uid}`}
            href={`/project?slug=${selectedProject.uid}`} // URL exposed to the browser
            key={selectedProject.id} // simplified URL for next.js client routing
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

          footer {
            position: relative;
            height: ${FOOTER_HEIGHT}px;
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
            line-height: ${lineHeights.heading};
            margin-bottom: 8px;
          }

          .title {
            line-height: ${lineHeights.heading};
            font-weight: ${weights.light};
            font-size: ${fonts.f20};
            text-transform: uppercase;
          }
        `}</style>
      </div>
    );
  }
}
