import { Component } from 'react';
import Head from 'next/head';
import Prismic from 'prismic-javascript';
import { RichText } from 'prismic-dom';

import { getApi } from '~/lib/prismic';
import { groupByYear } from '~/lib/utils';
import PageMeta from '~/components/PageMeta';
import Header from '~/components/Header';
import MainHeading from '~/components/MainHeading';
import Container from '~/components/Container';
import Link from 'next/link';
import { weights } from '~/lib/theme';

const Exhibition = ({ exhibition: { title, venue, venue_link, location } }) => (
  <li>
    {RichText.asText(title)},{' '}
    <Link href={venue_link ? venue_link.url : undefined}>
      <a>{venue}</a>
    </Link>, {location}
    <style jsx>{`
      // NOTE: Duplicates PressItem
      li {
        list-style: none;
      }
      a {
        font-weight: ${weights.bold};
        text-decoration: underline;
        text-decoration-skip: ink;
      }
    `}</style>
  </li>
);

export default class Exhibitions extends Component {
  static async getInitialProps({ req, query }) {
    const api = await getApi(req);
    const exhibitionsResponse = await api.query(
      Prismic.Predicates.at('document.type', 'exhibition'),
      {
        orderings: '[my.exhibition.date desc]',
        pageSize: 100,
      }
    );
    const exhibitions = exhibitionsResponse.results.map(r => ({
      uid: r.uid,
      ...r.data,
      exhibition_type: r.data.exhibition_type || 'solo',
    }));

    return {
      soloExhibitions: exhibitions.filter(e => e.exhibition_type === 'solo'),
      groupExhibitions: exhibitions.filter(e => e.exhibition_type === 'group'),
    };
  }

  render() {
    const { soloExhibitions, groupExhibitions, url } = this.props;

    return (
      <div>
        <Head>
          <title>Exhibitions | Bradley McCallum</title>
        </Head>
        <PageMeta />
        <Header pathname={url.pathname} />

        <Container>
          <MainHeading>Exhibitions List</MainHeading>

          <h2>Solo</h2>
          <ul>
            {groupByYear(soloExhibitions).map(([year, exhibitions]) => (
              <li>
                <h3>{year}</h3>
                <ul>
                  {exhibitions.map(exhibition => (
                    <Exhibition exhibition={exhibition} />
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <h2>Group</h2>
          <ul>
            {groupByYear(groupExhibitions).map(([year, exhibitions]) => (
              <li>
                <h3>{year}</h3>
                <ul>
                  {exhibitions.map(exhibition => (
                    <Exhibition exhibition={exhibition} />
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>

        <style jsx>{`
          ul {
            padding-left: 0;
          }
          li {
            list-style: none;
          }
        `}</style>
      </div>
    );
  }
}
