import { Component } from "react";
import Head from "next/head";
import Prismic from "prismic-javascript";

import { getApi } from "~/lib/prismic";
import PageMeta from "~/components/PageMeta";
import Header from "~/components/Header";

export default class extends Component {
  static async getInitialProps({ req, query }) {
    const api = await getApi(req);

    return {
      // exhibitions: exhibitions.map(e => ({ uid: e.uid, ...e.data })),
    };
  }

  render() {
    const { exhibitions, url } = this.props;

    return (
      <div>
        <Head>
          <title>About</title>
        </Head>
        <PageMeta />
        <Header pathname={url.pathname} />

        <div />
        <style jsx>{``}</style>
      </div>
    );
  }
}
