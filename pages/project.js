import { Component } from "react";
import Head from "next/head";

import { getClient } from "~/lib/contentful";
import Header from "~/components/Header";
import Container from "~/components/Container";
import ContentItem from "~/components/ContentItem";

export default class extends Component {
  static async getInitialProps({ query }) {
    const entries = await getClient({ preview: !!query.preview }).getEntries({
      content_type: "project",
      "fields.slug": query.slug,
      limit: 1,
    });
    return {
      project: entries.items[0].fields,
    };
  }

  render() {
    const { project } = this.props;

    return (
      <div>
        <Head>
          <title>Projects</title>
        </Head>
        <Header />

        <Container>
          <h1>
            {project.title}
          </h1>
          <p>
            {project.materials}
          </p>
          <p>
            {project.collaborators}
          </p>
          <p>
            {project.date}
          </p>
          <p>
            {project.acknowledgements}
          </p>

          {project.content.map(contentItem =>
            <ContentItem item={contentItem} key={contentItem.sys.id} />
          )}
        </Container>

        <style jsx>{``}</style>
      </div>
    );
  }
}
