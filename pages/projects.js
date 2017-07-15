import { Component } from "react";
import Head from "next/head";

import contentful from "~/lib/contentful";
import Header from "~/components/header";

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

        <p>
          {project.introduction}
        </p>
        <style jsx>{`
          p {
            color: blue;
          }
          div {
            background: red;
          }
          @media (max-width: 600px) {
            div {
              background: blue;
            }
          }
        `}</style>
      </div>
    );
  }
}
