import { Component } from 'react';
import Head from 'next/head';

import { getApi } from '~/lib/prismic';
import PageMeta from '~/components/PageMeta';
import Header from '~/components/Header';
import Container from '~/components/Container';
import MainHeading from '~/components/MainHeading';
import SmallHeading from '~/components/SmallHeading';
import Divider from '~/components/Divider';
import Paragraph from '~/components/Paragraph';

export default class About extends Component {
  static async getInitialProps({ req, query, pathname }) {
    const api = await getApi(req);

    const aboutPage = await api.getSingle('about_page');

    return { ...aboutPage.data, pathname };
  }

  render() {
    const { biography, cv_text, cv_file, pathname } = this.props;

    return (
      <div>
        <Head>
          <title>About | Bradley McCallum</title>
        </Head>
        <PageMeta />
        <Header pathname={pathname} />

        <MainHeading>About</MainHeading>

        <Container>
          <SmallHeading>Biography</SmallHeading>
        </Container>
        <Paragraph item={{ text: biography }} />

        <Divider />

        <Container>
          <SmallHeading>CV</SmallHeading>
        </Container>
        <Paragraph item={{ text: cv_text }} />

        <style jsx>{``}</style>
      </div>
    );
  }
}
