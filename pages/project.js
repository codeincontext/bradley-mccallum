import { Component } from 'react';
import Head from 'next/head';
import { Element as ScrollElement } from 'react-scroll';
import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom';
import groupBy from 'lodash.groupby';

import { getApi } from '~/lib/prismic';
import { scrollNameForExhibitionId } from '~/lib/scrollNames';
import PageMeta from '~/components/PageMeta';
import Header from '~/components/Header';
import MainHeading from '~/components/MainHeading';
import Container from '~/components/Container';
import ContentItem from '~/components/ContentItem';
import Sidebar from '~/components/Sidebar';
import RichText from '~/components/RichText';
import PressItem from '~/components/PressItem';
import { fonts, weights, spacing, colors } from '~/components/theme';

export default class Project extends Component {
  static async getInitialProps({ req, query }) {
    const api = await getApi(req);
    const project = await api.getByUID('project', query.slug);

    const exhibitionIds = project.data.exhibitions.map(e => e.exhibition.id);
    const exhibitions = (await api.getByIDs(exhibitionIds)).results;

    const pressItemIds = project.data.press_items.map(
      item => item.press_item.id
    );
    const pressItemsResponse = await api.getByIDs(pressItemIds, {
      orderings: '[my.press_item.date desc]',
    });
    const pressItems = groupBy(
      pressItemsResponse.results.map(item => ({ id: item.id, ...item.data })),
      item => new Date(item.date).getFullYear()
    );

    return {
      project: { uid: project.uid, ...project.data },
      exhibitions: exhibitions.map(e => ({ uid: e.uid, ...e.data })),
      pressItems,
    };
  }

  render() {
    const { project, exhibitions, pressItems, url } = this.props;

    const pressItemYears = Object.entries(pressItems).sort(
      ([year1], [year2]) => year2 - year1
    );

    return (
      <div>
        <Head>
          <title>
            {PrismicDom.RichText.asText(project.title)} | Bradley McCallum
          </title>
        </Head>
        <PageMeta />
        <Header pathname={url.pathname} />

        <div className="project-page">
          <Sidebar
            className="sidebar"
            items={[
              {
                label: PrismicDom.RichText.asText(project.title),
                scrollName: 'artwork',
              },
              { label: 'Exhibitions', scrollName: 'exhibitions' },
              ...exhibitions.map(exhibition => ({
                label: exhibition.location,
                scrollName: scrollNameForExhibitionId(exhibition.uid),
              })),
              { label: 'Press', scrollName: 'press' },
              { label: 'Acknowledgements', scrollName: 'acknowledgements' },
            ]}
          />

          <div className="project-content">
            <ScrollElement name="artwork">
              <section className="first-section">
                <Container>
                  <h1>{PrismicDom.RichText.asText(project.title)}</h1>
                  <p>{project.materials}</p>
                  <p>{new Date(project.date).getFullYear()}</p>
                  {project.collaborators && <p>{project.collaborators}</p>}
                  <p>
                    Project website:{' '}
                    <a href="{project.websiteLinkUrl}">
                      {project.websiteLinkText}
                    </a>
                  </p>
                </Container>

                {(project.body || [])
                  .map(contentItem => (
                    <ContentItem
                      item={contentItem} /* key={contentItem.sys.id} */
                    />
                  ))}
              </section>
            </ScrollElement>

            <Container>
              <ScrollElement name="exhibitions">
                <section>
                  <MainHeading>Exhibitions</MainHeading>
                </section>
              </ScrollElement>
            </Container>

            {exhibitions.map(exhibition => (
              <ScrollElement
                name={scrollNameForExhibitionId(exhibition.uid)}
                key={exhibition.uid}
              >
                <section>
                  <Container>
                    <h3>{exhibition.location}</h3>
                    <p>{new Date(exhibition.date).getFullYear()}</p>
                  </Container>
                  {(exhibition.body || []).map(contentItem => (
                    <ContentItem
                      item={contentItem}
                      // key={contentItem.sys.id}
                    />
                  ))}
                </section>
              </ScrollElement>
            ))}

            <Container>
              <ScrollElement name="press">
                <section>
                  <MainHeading>Press</MainHeading>
                  {pressItemYears.map(([year, items]) => (
                    <div>
                      <h4>{year}</h4>
                      <ul>{items.map(item => <PressItem item={item} />)}</ul>
                    </div>
                  ))}
                </section>
              </ScrollElement>
            </Container>

            <Container>
              <ScrollElement name="acknowledgements">
                <section>
                  <MainHeading>Acknowledgements</MainHeading>
                  <RichText text={project.acknowledgements} />
                </section>
              </ScrollElement>
            </Container>
          </div>
        </div>

        <style jsx>{`
          .project-page {
            display: flex;
          }
          .project-content {
            margin-left: ${spacing.s5};
          }
          .sidebar {
            width: 30%;
          }
          h1 {
            font-weight: ${weights.bold};
          }

          section {
            /* Contain heading margin in section to prevent a gap between sections */
            overflow: auto;
          }
          .first-section {
            padding-top: 300px;
            margin-top: -300px;
          }
          .materials {
            text-transform: uppercase;
          }
          ul {
            padding-left: 0;
          }
          .acknowledgements {
            /* Ensure enough footer space to scroll to the bottom */
            min-height: 100vh;
          }
        `}</style>
      </div>
    );
  }
}
