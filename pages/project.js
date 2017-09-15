import { Component } from 'react';
import Head from 'next/head';
import { Element as ScrollElement } from 'react-scroll';
import PrismicDom from 'prismic-dom';

import { getApi } from '~/lib/prismic';
import { scrollNameForExhibitionId } from '~/lib/scrollNames';
import { groupByYear } from '~/lib/utils';
import PageMeta from '~/components/PageMeta';
import Header from '~/components/Header';
import MainHeading from '~/components/MainHeading';
import Container from '~/components/Container';
import ContentItem from '~/components/ContentItem';
import Sidebar from '~/components/Sidebar';
import Paragraph from '~/components/ContentItem/Paragraph';
import PressItem from '~/components/PressItem';
import YearListing from '~/components/YearListing';
import { weights } from '~/lib/theme';

export default class Project extends Component {
  static async getInitialProps({ req, query }) {
    const api = await getApi(req);
    const project = await api.getByUID('project', query.slug);

    const exhibitionIds = project.data.exhibitions.map(e => e.exhibition.id);
    const pressItemIds = project.data.press_items.map(
      item => item.press_item.id
    );

    const [exhibitionsResponse, pressItemsResponse] = await Promise.all([
      api.getByIDs(exhibitionIds),
      api.getByIDs(pressItemIds, {
        orderings: '[my.press_item.date desc]',
      }),
    ]);

    return {
      project: { uid: project.uid, ...project.data },
      exhibitions: exhibitionsResponse.results.map(e => ({
        uid: e.uid,
        ...e.data,
      })),
      pressItems: pressItemsResponse.results.map(item => ({
        id: item.id,
        ...item.data,
      })),
    };
  }

  render() {
    const { project, exhibitions, pressItems, url } = this.props;

    return (
      <div>
        <Head>
          <title>
            {PrismicDom.RichText.asText(project.title)} | Bradley McCallum
          </title>
        </Head>
        <PageMeta />
        <Header pathname={url.pathname} />

        <Sidebar
          className="sidebar"
          items={[
            {
              label: PrismicDom.RichText.asText(project.title),
              scrollName: 'artwork',
            },
            exhibitions.length && {
              label: 'Exhibitions',
              scrollName: 'exhibitions',
            },
            ...exhibitions.map(exhibition => ({
              label: exhibition.location,
              scrollName: scrollNameForExhibitionId(exhibition.uid),
            })),
            project.civic_dialogues.length && {
              label: 'Civic Dialogues',
              scrollName: 'civic-dialogues',
            },
            pressItems.length && { label: 'Press', scrollName: 'press' },
            project.acknowledgements.length && {
              label: 'Acknowledgements',
              scrollName: 'acknowledgements',
            },
          ].filter(item => item)}
        />

        <ScrollElement name="artwork">
          <section className="first-section">
            <Container>
              <h1>
                {project.long_title ||
                  PrismicDom.RichText.asText(project.title)}
              </h1>
              <p>{project.materials}</p>
              <p>{project.year_text || new Date(project.date).getFullYear()}</p>
              {project.collaborators && <p>{project.collaborators}</p>}
              {project.websiteLinkText && (
                <p>
                  Project website:{' '}
                  <a href="{project.websiteLinkUrl}">
                    {project.websiteLinkText}
                  </a>
                </p>
              )}
            </Container>

            {(project.body || [])
              .map((contentItem, i) => (
                <ContentItem item={contentItem} key={i} />
              ))}
          </section>
        </ScrollElement>

        {!!exhibitions.length && (
          <ScrollElement name="exhibitions">
            <section>
              <MainHeading>
                <h2>Exhibitions</h2>
              </MainHeading>
            </section>
          </ScrollElement>
        )}

        {!!project.civic_dialogues.length && (
          <ScrollElement name="civic-dialogues">
            <section>
              <MainHeading>Civic Dialogues</MainHeading>
              {(project.civic_dialogues || [])
                .map((contentItem, i) => (
                  <ContentItem item={contentItem} key={i} />
                ))}
            </section>
          </ScrollElement>
        )}

        {!!pressItems.length && (
          <ScrollElement name="press">
            <section>
              <MainHeading>
                <h2>Press</h2>
              </MainHeading>
              <Container>
                {groupByYear(pressItems).map(([year, items]) => (
                  <YearListing year={year} key={year}>
                    {items.map(item => <PressItem key={item.id} item={item} />)}
                  </YearListing>
                ))}
              </Container>
            </section>
          </ScrollElement>
        )}

        {!!project.acknowledgements.length && (
          <ScrollElement name="acknowledgements">
            <section>
              <MainHeading>
                <h2>Acknowledgements</h2>
              </MainHeading>
              <Paragraph item={{ text: project.acknowledgements }} />
            </section>
          </ScrollElement>
        )}

        <style jsx>{`
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
