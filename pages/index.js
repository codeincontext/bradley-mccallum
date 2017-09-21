import { Component } from 'react';
import Head from 'next/head';
import { Element as ScrollElement } from 'react-scroll';

import Prismic from 'prismic-javascript';
import { getApi } from '~/lib/prismic';
import { scrollNameForYear, YEARS } from '~/lib/scrollNames';
import PageMeta from '~/components/PageMeta';
import Header from '~/components/Header';
import Masonry from '~/components/Masonry';
import Sidebar from '~/components/Sidebar';
import FeaturedProjectCarousel from '~/components/FeaturedProjectCarousel';
import { spacing, colors, HEADER_HEIGHT } from '~/lib/theme';

export const THIN_SIDEBAR_WIDTH = 180;
export const WIDE_CONTAINER_WIDTH = 956;

export default class Index extends Component {
  static async getInitialProps({ req, query, pathname }) {
    const api = await getApi(req);

    const [projectsResponse, homepage] = await Promise.all([
      api.query(
        [
          Prismic.Predicates.at('document.type', 'project'),
          Prismic.Predicates.not('my.project.uid', 'special-exhibitions'),
        ],
        {
          orderings: '[my.project.date desc]',
          pageSize: 100,
        }
      ),
      api.getSingle('home_page', {
        fetchLinks: 'project.title,project.year_text,project.date',
      }),
    ]);

    return {
      projects: projectsResponse.results.map(r => ({ uid: r.uid, ...r.data })),
      features: homepage.data.featured_projects.map(f => ({
        ...f,
        project: { ...f.project.data, uid: f.project.uid },
      })),
      pathname,
    };
  }

  // TODO: This is never true
  state = { artworksActive: false };

  render() {
    const { projects, features, pathname } = this.props;
    const { artworksActive } = this.state;

    return (
      <div>
        <Head>
          <title>Home | Bradley McCallum</title>
        </Head>
        <PageMeta />
        <Header
          pathname={pathname}
          artworksActive={this.state.artworksActive}
        />

        <Sidebar
          items={YEARS.map((year, i) => ({
            label: i === 0 ? 'Current' : year,
            scrollName: scrollNameForYear(year),
          }))}
        />

        <FeaturedProjectCarousel features={features} />

        <div className="artworks">
          <ScrollElement name="artworks" className="artworks-scroll-element" />

          {YEARS.map((year, i) => (
            <div className="project-collection-container" key={year}>
              <div className="project-collection">
                <ScrollElement
                  className="scroll-element"
                  name={scrollNameForYear(year)}
                />
                <Masonry
                  projects={projects.filter(p => {
                    const projectYear = new Date(p.date).getFullYear();
                    const nextYear = YEARS[i + 1] || 1900;
                    return projectYear <= year && projectYear > nextYear;
                  })}
                  firstSection={i === 0}
                  lastSection={i === YEARS.length - 1}
                />
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .header {
            // So the first section is active in the nav at the top of the page
            padding-top: 300px;
            margin-top: -300px;
          }

          .project-collection-container {
            margin: 0 20px 0 ${THIN_SIDEBAR_WIDTH}px;
          }

          .project-collection {
            max-width: ${WIDE_CONTAINER_WIDTH}px;
            margin: 0 auto;

            background: radial-gradient(${colors.black} 15%, transparent 16%),
              radial-gradient(${colors.black} 15%, transparent 16%),
              ${colors.lightGrey};
            background-size: 7px 7px;
            background-position: -1px -1px;
            padding-bottom: ${spacing.s4};
            margin-bottom: ${spacing.s3};
            position: relative;
          }
          .project-collection :global(.scroll-element) {
            position: absolute;
            top: 0;
            // Include the margin after the collection in the scroll area
            bottom: -${spacing.s3};
          }

          .artworks {
            position: relative;
          }
          :global(.artworks-scroll-element) {
            position: absolute;
            top: 0;
            height: 9999px;
          }
        `}</style>
      </div>
    );
  }
}
