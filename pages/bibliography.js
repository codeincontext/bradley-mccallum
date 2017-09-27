import { Component } from 'react';
import Head from 'next/head';
import Prismic from 'prismic-javascript';
import { Element as ScrollElement } from 'react-scroll';

import { getApi } from '~/lib/prismic';
import { groupByYear } from '~/lib/utils';
import PageMeta from '~/components/PageMeta';
import Header from '~/components/Header';
import Sidebar from '~/components/Sidebar';
import MainHeading from '~/components/MainHeading';
import Container from '~/components/Container';
import PressItem from '~/components/PressItem';
import YearListing from '~/components/YearListing';
import SmallHeading from '~/components/SmallHeading';
import Divider from '~/components/ContentItem/Divider';
import YearListingItem from '~/components/YearListingItem';

const Catalogue = ({ catalogue }) => (
  <YearListingItem>{catalogue.title}</YearListingItem>
);

export default class Bibliography extends Component {
  static async getInitialProps({ req, query, pathname }) {
    const api = await getApi(req);

    const [catalogueResponse, pressItemResponse] = await Promise.all([
      api.query(Prismic.Predicates.at('document.type', 'catalogue'), {
        orderings: '[my.catalogue.date desc]',
        pageSize: 100,
      }),
      api.query(Prismic.Predicates.at('document.type', 'press_item'), {
        orderings: '[my.press_item.date desc]',
        pageSize: 100,
      }),
    ]);

    return {
      catalogues: catalogueResponse.results.map(item => ({
        id: item.id,
        ...item.data,
      })),
      pressItems: pressItemResponse.results.map(item => ({
        id: item.id,
        ...item.data,
      })),
      pathname,
    };
  }

  render() {
    const { catalogues, pressItems, pathname } = this.props;

    return (
      <div>
        <Head>
          <title>Bibliography | Bradley McCallum</title>
        </Head>
        <PageMeta />
        <Header pathname={pathname} />

        <Sidebar
          items={[
            {
              label: 'Catalogues',
              scrollName: 'catalogues',
            },
            {
              label: 'Reviews',
              scrollName: 'reviews',
            },
          ]}
        />

        <MainHeading>
          <h1>Bibliography</h1>
        </MainHeading>

        <ScrollElement name="catalogues">
          <Container>
            <SmallHeading>Catalogues</SmallHeading>
            <ul>
              {groupByYear(catalogues).map(([year, catalogues]) => (
                <YearListing year={year} key={year}>
                  {catalogues.map(catalogue => (
                    <Catalogue catalogue={catalogue} key={catalogue.id} />
                  ))}
                </YearListing>
              ))}
            </ul>
          </Container>
        </ScrollElement>

        <Divider />

        <ScrollElement name="reviews">
          <Container>
            <SmallHeading>Reviews</SmallHeading>
            <ul>
              {groupByYear(pressItems).map(([year, items]) => (
                <YearListing year={year} key={year}>
                  {items.map(item => <PressItem item={item} key={item.id} />)}
                </YearListing>
              ))}
            </ul>
          </Container>
        </ScrollElement>

        <style jsx>{`
          ul {
            padding-left: 0;
          }
        `}</style>
      </div>
    );
  }
}
