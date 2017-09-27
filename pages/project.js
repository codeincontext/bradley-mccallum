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
import Exhibition from '~/components/Exhibition';
import YearListing from '~/components/YearListing';
import { fonts, weights } from '~/lib/theme';

export default class Project extends Component {
  static async getInitialProps({ req, query, pathname }) {
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
      pathname,
    };
  }

  render() {
    const { project, exhibitions, pressItems, pathname } = this.props;

    return (
      <div>
        <Head>
          <title>
            {PrismicDom.RichText.asText(project.title)} | Bradley McCallum
          </title>
        </Head>
        <PageMeta />
        <Header pathname={pathname} />

        <Sidebar
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
              parentName: 'exhibitions',
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
          <section>
            <Container>
              <div className="intro">
                <h1>
                  {project.long_title ||
                    PrismicDom.RichText.asText(project.title)}
                </h1>
                <p>{project.materials}</p>
                <p>
                  {project.year_text || new Date(project.date).getFullYear()}
                </p>
                {project.collaborators && <p>{project.collaborators}</p>}
                {project.websiteLinkText && (
                  <p>
                    Project website:{' '}
                    <a href="{project.websiteLinkUrl}">
                      {project.websiteLinkText}
                    </a>
                  </p>
                )}
              </div>
            </Container>

            {(project.body || [])
              .map((contentItem, i) => (
                <ContentItem item={contentItem} key={i} />
              ))}
          </section>
        </ScrollElement>

        {!!exhibitions.length && (
          <div>
            <ScrollElement name="exhibitions" />
            {exhibitions.map((exhibition, i) => (
              <ScrollElement
                name={scrollNameForExhibitionId(exhibition.uid)}
                key={exhibition.uid}
              >
                {i === 0 && (
                  <section>
                    <MainHeading>
                      <h2>Exhibitions</h2>
                    </MainHeading>
                  </section>
                )}
                <Exhibition exhibition={exhibition} />
              </ScrollElement>
            ))}
          </div>
        )}

        {!!project.civic_dialogues.length && (
          <ScrollElement name="civic-dialogues">
            <section>
              <MainHeading>
                <h2>Civic Dialogues</h2>
              </MainHeading>
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
          h1 {
            font-size: ${fonts.f24};
            font-weight: ${weights.bold};
          }

          .intro {
            font-size: ${fonts.f14};
          }
          ul {
            padding-left: 0;
          }
        `}</style>
      </div>
    );
  }
}
