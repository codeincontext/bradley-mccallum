import { Component } from 'react';
import Head from 'next/head';
import { Element as ScrollElement } from 'react-scroll';

import Prismic from 'prismic-javascript';
import { getApi } from '~/lib/prismic';
import { scrollNameForYear, YEARS } from '~/lib/scrollNames';
import Container from '~/components/Container';
import PageMeta from '~/components/PageMeta';
import Header from '~/components/Header';
import ImageSlider from '~/components/ImageSlider';
import Masonry from '~/components/Masonry';
import Sidebar from '~/components/Sidebar';
import FeaturedProjectCarousel from '~/components/FeaturedProjectCarousel';
import { spacing, colors } from '~/lib/theme';

export default class Index extends Component {
  static async getInitialProps({ req, query, pathname }) {
    const api = await getApi(req);

    const [projectsResponse, homepage] = await Promise.all([
      api.query(Prismic.Predicates.at('document.type', 'project'), {
        orderings: '[my.project.date desc]',
        pageSize: 100,
      }),
      api.getSingle('home_page', {
        fetchLinks: 'project.title,project.year_text,project.date',
      }),
    ]);

    return {
      projects: projectsResponse.results.map(r => ({ uid: r.uid, ...r.data })),
      features: homepage.data.featured_projects.map(f => ({
        ...f,
        project: f.project.data,
      })),
      pathname,
    };
  }

  render() {
    const { projects, features, pathname } = this.props;

    return (
      <div>
        <Head>
          <title>Home | Bradley McCallum</title>
        </Head>
        <PageMeta />
        <Header pathname={pathname} />

        <Sidebar
          items={YEARS.map((year, i) => ({
            label: i === 0 ? 'Current' : year,
            scrollName: scrollNameForYear(year),
          }))}
        />

        <ScrollElement name="home-header">
          <FeaturedProjectCarousel features={features} />
        </ScrollElement>

        <Container width={956}>
          {YEARS.map((year, i) => (
            <ScrollElement name={scrollNameForYear(year)}>
              <div className="project-collection">
                {/* TODO not used classname */}
                <div className={i === 0 ? 'firstSection' : null}>
                  <Masonry
                    projects={projects.filter(p => {
                      const projectYear = new Date(p.date).getFullYear();
                      const nextYear = YEARS[i + 1] || 1900;
                      return projectYear <= year && projectYear > nextYear;
                    })}
                    firstSection={i === 0}
                  />
                </div>
              </div>
            </ScrollElement>
          ))}
        </Container>

        <div className="spacer" />

        <style jsx>{`
          .spacer {
            // height: 100vh;
          }
          .header {
            // So the first section is active in the nav at the top of the page
            padding-top: 300px;
            margin-top: -300px;
          }
          .project-collection {
            background: radial-gradient(${colors.black} 15%, transparent 16%),
              radial-gradient(${colors.black} 15%, transparent 16%),
              ${colors.lightGrey};
            background-size: 7px 7px;
            background-position: -1px -1px;
            padding-bottom: ${spacing.s4};
            margin-bottom: ${spacing.s3};
          }
        `}</style>
      </div>
    );
  }
}
