import { Component } from 'react';
import Head from 'next/head';

import { getApi } from '~/lib/prismic';
import PageMeta from '~/components/PageMeta';
import Header from '~/components/Header';
import MainHeading from '~/components/MainHeading';
import Container from '~/components/Container';
import SmallHeading from '~/components/SmallHeading';
import Divider from '~/components/ContentItem/Divider';
import Paragraph from '~/components/ContentItem/Paragraph';

export default class Contact extends Component {
  static async getInitialProps({ req, query, pathname }) {
    const api = await getApi(req);

    const contactPage = await api.getSingle('contact_page');

    return { ...contactPage.data, pathname };
  }

  render() {
    const {
      studio_details,
      conjunction_arts,
      galleries,
      pathname,
    } = this.props;

    return (
      <div>
        <Head>
          <title>Contact | Bradley McCallum</title>
        </Head>
        <PageMeta />
        <Header pathname={pathname} />

        <MainHeading>Contact</MainHeading>

        <Container>
          <SmallHeading>Studio</SmallHeading>
        </Container>
        <Paragraph item={{ text: studio_details }} />

        <Divider />

        <Container>
          <SmallHeading>Conjunction Arts</SmallHeading>
        </Container>
        <Paragraph item={{ text: conjunction_arts }} />

        <Divider />

        <Container>
          <SmallHeading>Galleries</SmallHeading>
        </Container>
        <Paragraph item={{ text: galleries }} />

        <style jsx>{``}</style>
      </div>
    );
  }
}
