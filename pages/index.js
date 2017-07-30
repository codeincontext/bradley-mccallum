import { Component } from "react";
import Head from "next/head";

import { getClient } from "~/lib/contentful";
import Container from "~/components/Container";
import Header from "~/components/Header";
import ImageSlider from "~/components/ImageSlider";
import ProjectPreview from "~/components/ProjectPreview";
import Sidebar from "~/components/Sidebar";

export default class extends Component {
  static async getInitialProps({ query }) {
    const entries = await getClient({ preview: !!query.preview }).getEntries(
      { content_type: "project" },
      { sort: "date" }
    );
    return {
      projects: entries.items.map(item => item.fields),
    };
  }

  render() {
    const { sliderImages, projects } = this.props;

    return (
      <div>
        <Head>
          <title>Home</title>
        </Head>

        <Header />

        <Sidebar
          items={[
            { label: "2017" },
            { label: "2010" },
            { label: "2005" },
            { label: "2000" },
            { label: "1995" },
            { label: "1990" },
          ]}
        />

        <Container>
          <ImageSlider item={{ images: [] }} />

          {projects.map(project => <ProjectPreview project={project} />)}
        </Container>

        <style jsx>{`
          li {
          }
        `}</style>
      </div>
    );
  }
}
