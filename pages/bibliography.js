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

export default class Bibliography extends Component {
  static async getInitialProps({ req, query }) {
    const api = await getApi(req);
    const pressItemResponse = await api.query(
      Prismic.Predicates.at('document.type', 'press_item'),
      {
        orderings: '[my.press_item.date desc]',
        pageSize: 100,
      }
    );

    return {
      pressItems: pressItemResponse.results.map(item => ({
        uid: item.uid,
        ...item.data,
      })),
    };
  }

  render() {
    const { pressItems, url } = this.props;

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

          <h2>Reviews</h2>
          {groupByYear(pressItems).map(([year, items]) => (
            <div>
              <h4>{year}</h4>
              <ul>{items.map(item => <PressItem item={item} />)}</ul>
            </div>
          ))}
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
