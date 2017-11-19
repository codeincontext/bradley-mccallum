import { Component } from 'react';
import Head from 'next/head';
import { Element as ScrollElement } from 'react-scroll';

import { getApi } from '~/lib/prismic';
import Layout from '~/components/Layout';
import Header from '~/components/Header';
import Sidebar from '~/components/Sidebar';
import MainHeading from '~/components/MainHeading';
import SmallHeading from '~/components/SmallHeading';
import Divider from '~/components/ContentItem/Divider';
import Paragraph from '~/components/ContentItem/Paragraph';

export default class About extends Component {
  static async getInitialProps({ req, query, pathname }) {
    const api = await getApi(req);

    const aboutPage = await api.getSingle('about_page');

    return { ...aboutPage.data, pathname };
  }

  state = {
    email: null,
  };

  componentDidMount() {
    setTimeout(() => this.setEmail(), 500);
  }

  setEmail() {
    const value = 'bradleymccallum^me.com'.replace('^', '@');
    const paragraph = {
      text: [
        {
          type: 'paragraph',
          text: value,
          spans: [
            {
              start: 0,
              end: value.length,
              type: 'hyperlink',
              data: {
                link_type: 'Web',
                url: `mailto:${value}`,
              },
              url: `mailto:${value}`,
            },
          ],
        },
      ],
    };
    this.setState({ email: paragraph });
  }

  render() {
    const { biography, cv_text, cv_file, pathname } = this.props;
    const { email } = this.state;

    return (
      <Layout>
        <Head>
          <title>About | Bradley McCallum</title>
        </Head>
        <Header pathname={pathname} />

        <Sidebar
          items={[
            {
              label: 'Biography',
              scrollName: 'biography',
            },
            {
              label: 'CV',
              scrollName: 'cv',
            },
          ]}
        />

        <MainHeading>
          <h1>About</h1>
        </MainHeading>

        <ScrollElement name="biography">
          <SmallHeading>Biography</SmallHeading>
          <Paragraph item={{ text: biography }} />
        </ScrollElement>

        <ScrollElement name="cv">
          <Divider />

          <SmallHeading>CV</SmallHeading>
          <Paragraph item={{ text: cv_text }} />

          {email && <Paragraph item={email} />}
        </ScrollElement>

        <style jsx>{``}</style>
      </Layout>
    );
  }
}
