import Head from "next/head";

export default () =>
  <header>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <style global jsx>{`
      body {
        background: black;
      }
    `}</style>
  </header>;
