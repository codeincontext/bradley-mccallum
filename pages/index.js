import { Component } from 'react';
import Head from 'next/head';
import { Element as ScrollElement } from 'react-scroll';
import Observer from '@researchgate/react-intersection-observer';

import Prismic from 'prismic-javascript';
import { getApi } from '~/lib/prismic';
import { scrollNameForYear, YEARS } from '~/lib/scrollNames';
import Layout from '~/components/Layout';
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

  state = { artworksActive: false };

  handleIntersection = event => {
    // The polyfill isn't async https://github.com/w3c/IntersectionObserver/issues/225
    // But using requestIdleCallback makes behaviour unreliable in Chrome
    this.setState({ artworksActive: !event.isIntersecting });
  };

  render() {
    const { projects, features, pathname } = this.props;
    const { artworksActive } = this.state;

    return (
      <Layout>
        <Head>
          <title>Home | Bradley McCallum</title>
        </Head>
        <Header
          pathname={pathname}
          artworksActive={this.state.artworksActive}
        />

        <Sidebar
          hidden={!this.state.artworksActive}
          items={YEARS.map((year, i) => ({
            label: i === 0 ? 'Current' : year,
            scrollName: scrollNameForYear(year),
          }))}
          onActiveChange={this.handleActiveSidebarItem}
        />

        <Observer
          onChange={this.handleIntersection}
          rootMargin={`-${HEADER_HEIGHT}px 0px 0px 0px`}
        >
          <FeaturedProjectCarousel features={features} />
        </Observer>

        <ScrollElement name="artworks" />

        {YEARS.map((year, i) => (
          <div className="project-collection-container" key={year}>
            <div className="project-collection">
              <ScrollElement name={scrollNameForYear(year)}>
                <Masonry
                  projects={projects.filter(p => {
                    const projectYear = new Date(p.date).getFullYear();
                    const nextYear = YEARS[i + 1] || 1900;
                    return projectYear <= year && projectYear > nextYear;
                  })}
                  firstSection={i === 0}
                  lastSection={i === YEARS.length - 1}
                />
              </ScrollElement>
            </div>
          </div>
        ))}

        <style jsx>{`
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
          }
        `}</style>
      </Layout>
    );
  }
}
