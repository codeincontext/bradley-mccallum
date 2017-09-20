import PrismicDom from 'prismic-dom';
import Link from 'next/link';
import Image from '~/components/Image';
import RichText from '~/components/RichText';
import Carousel from '~/components/Carousel';
import { weights, fonts, lineHeights, colors, spacing } from '~/lib/theme';

export default class FeaturedProjectCarousel extends React.Component {
  state = { selectedIndex: 0 };

  handleIndexChange = (id, item) => {
    this.setState({ selectedIndex: id });
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

        <div className="tabWrapper">
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
        </div>

        <style jsx>{`
          .root {
            opacity: 0.999;
          }

          .item {
            display: block;
            background-size: cover;
            background-position: center;
            height: calc(100vh - 89px - 100px);
          }

          .tabWrapper {
            display:flex;
            align-items: right;
          }
          .tab {
            flex-grow: 0;
            margin-top: -${spacing.s2};
            z-index: 1;
            margin-left: auto;
            background: ${colors.lightGrey}
            padding: ${spacing.s1}
          }

          .year {
            font-size: ${fonts.f16};
            font-weight: ${weights.bold};
            letter-spacing: 0.1em;
            line-height: ${lineHeights.title};
margin-bottom: ${spacing.s05};
          }

          .title {
            font-weight: ${weights.light};
            font-size: ${fonts.f20};
            text-transform: uppercase;
            letter-spacing: 0.1em;
            line-height: ${lineHeights.title};
          }
        `}</style>
      </div>
    );
  }
}
