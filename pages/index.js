import { Component } from "react";
import Head from "next/head";

import { getClient } from "~/lib/contentful";
import Container from "~/components/Container";
import Header from "~/components/Header";
import ImageSlider from "~/components/ImageSlider";
import ProjectPreview from "~/components/ProjectPreview";
import Sidebar from "~/components/Sidebar";

const scrollNameForYear = year => `year-${year}`;

const scrollNameForProject = project => {
  const year = new Date(project.date).getFullYear();
  const closestYear = YEARS.find(y => y <= year);
  return scrollNameForYear(closestYear);
};

const thisYear = new Date().getFullYear();
const YEARS = [thisYear, 2010, 2005, 2000, 1995, 1990];

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
          items={YEARS.map(year => ({
            label: year,
            scrollName: scrollNameForYear(year),
          }))}
        />

        <Container>
          <ImageSlider item={{ images: [] }} />

          {projects.map(project =>
            <ProjectPreview
              project={project}
              scrollName={scrollNameForProject(project)}
            />
          )}
        </Container>

        <style jsx>{``}</style>
      </div>
    );
  }
}
