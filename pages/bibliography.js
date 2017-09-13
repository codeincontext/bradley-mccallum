import { Component } from 'react';
import Head from 'next/head';
import Prismic from 'prismic-javascript';
import groupBy from 'lodash.groupby';

import { getApi } from '~/lib/prismic';
import { groupByYear } from '~/lib/utils';
import PageMeta from '~/components/PageMeta';
import Header from '~/components/Header';
import MainHeading from '~/components/MainHeading';
import Container from '~/components/Container';
import PressItem from '~/components/PressItem';
import YearListing from '~/components/YearListing';
import SmallHeading from '~/components/SmallHeading';
import Divider from '~/components/Divider';
import YearListingItem from '~/components/YearListingItem';

const Catalogue = ({ catalogue }) => (
  <YearListingItem>{catalogue.title}</YearListingItem>
);

export default class Bibliography extends Component {
  static async getInitialProps({ req, query }) {
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
        uid: item.uid,
        ...item.data,
      })),
      pressItems: pressItemResponse.results.map(item => ({
        uid: item.uid,
        ...item.data,
      })),
    };
  }

  render() {
    const { catalogues, pressItems, url } = this.props;

    const pressItemYears = Object.entries(pressItems).sort(
      ([year1], [year2]) => year2 - year1
    );

    return (
      <div>
        <Head>
          <title>Bibliography | Bradley McCallum</title>
        </Head>
        <PageMeta />
        <Header pathname={url.pathname} />

        <Container>
          <MainHeading>Bibliography</MainHeading>

          <SmallHeading>Catalogues</SmallHeading>
          <ul>
            {groupByYear(catalogues).map(([year, catalogues]) => (
              <YearListing year={year}>
                {catalogues.map(catalogue => (
                  <Catalogue catalogue={catalogue} />
                ))}
              </YearListing>
            ))}
          </ul>
        </Container>

        <Divider />

        <Container>
          <SmallHeading>Reviews</SmallHeading>
          <ul>
            {groupByYear(pressItems).map(([year, items]) => (
              <YearListing year={year}>
                {items.map(item => <PressItem item={item} />)}
              </YearListing>
            ))}
          </ul>
        </Container>

        <style jsx>{`
          ul {
            padding-left: 0;
          }
        `}</style>
      </div>
    );
  }
}
