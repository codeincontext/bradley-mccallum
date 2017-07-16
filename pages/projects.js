import { Component } from "react";
import Head from "next/head";

import contentful from "~/lib/contentful";
import Header from "~/components/Header";
import ContentItem from "~/components/ContentItem";

export default class extends Component {
  static async getInitialProps({ req }) {
    const entries = await contentful.getEntries({
      content_type: "project",
      "fields.slug": "weights-and-measures",
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

        <style jsx>{`
          p {
            color: blue;
          }
          div {
            background: #ddd;
          }
        `}</style>
      </div>
    );
  }
}
