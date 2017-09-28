import { Component } from 'react';
import Head from 'next/head';
import { Element as ScrollElement } from 'react-scroll';

import { getApi } from '~/lib/prismic';
import Layout from '~/components/Layout';
import Header from '~/components/Header';
import Sidebar from '~/components/Sidebar';
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
      <Layout>
        <Head>
          <title>Contact | Bradley McCallum</title>
        </Head>
        <Header pathname={pathname} />

        <Sidebar
          items={[
            {
              label: 'Studio',
              scrollName: 'studio',
            },
            {
              label: 'Conjunction Arts',
              scrollName: 'conjunction-arts',
            },
            {
              label: 'Galleries',
              scrollName: 'galleries',
            },
          ]}
        />

        <MainHeading>
          <h1>Contact</h1>
        </MainHeading>

        <ScrollElement name="studio">
          <Container>
            <SmallHeading>Studio</SmallHeading>
          </Container>
          <Paragraph item={{ text: studio_details }} />
        </ScrollElement>

        <Divider />

        <ScrollElement name="conjunction-arts">
          <Container>
            <SmallHeading>Conjunction Arts</SmallHeading>
          </Container>
          <Paragraph item={{ text: conjunction_arts }} />
        </ScrollElement>

        <Divider />

        <ScrollElement name="galleries">
          <Container>
            <SmallHeading>Galleries</SmallHeading>
          </Container>
          <Paragraph item={{ text: galleries }} />
        </ScrollElement>

        <style jsx>{``}</style>
      </Layout>
    );
  }
}
