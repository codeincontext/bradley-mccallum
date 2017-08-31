import Head from 'next/head';
import Header from '~/components/Header';
import { colors, weights } from '~/components/theme';

export default () => (
  <div>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700"
        rel="stylesheet"
      />
    </Head>
    <style global jsx>{`
      body {
        font-family: 'Lato', sans-serif;
        font-weight: ${weights.light};
        background: ${colors.lightGrey};
        margin: 0;
        padding: 0;
        letter-spacing: 1px;
      }
      a {
        color: ${colors.black};
        text-decoration: none;
      }
    `}</style>
  </div>
);
