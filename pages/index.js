import { Component } from "react";
import Head from "next/head";
import { Element as ScrollElement } from "react-scroll";

import { getClient } from "~/lib/contentful";
import { scrollNameForYear, YEARS } from "~/lib/scrollNames";
import Container from "~/components/Container";
import PageMeta from "~/components/PageMeta";
import Header from "~/components/Header";
import ImageSlider from "~/components/ImageSlider";
import Masonry from "~/components/Masonry";
import Sidebar from "~/components/Sidebar";
import { spacing, colors } from "~/components/theme";

export default class extends Component {
  static async getInitialProps({ query }) {
    const entries = await getClient({ preview: !!query.preview }).getEntries({
      content_type: "project",
      order: "-fields.date",
    });
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
        <PageMeta />
        <Header />

        <Sidebar
          items={YEARS.map((year, i) => ({
            label: i === 0 ? "Current" : year,
            scrollName: scrollNameForYear(year),
          }))}
        />

        <Container>
          <ImageSlider item={{ images: [] }} />

          {YEARS.map((year, i) =>
            <ScrollElement name={scrollNameForYear(year)}>
              <div className="project-collection">
                <div className={i === 0 ? "firstSection" : null}>
                  <Masonry
                    projects={projects.filter(p => {
                      const projectYear = new Date(p.date).getFullYear();
                      const nextYear = YEARS[i + 1] || 1900;
                      return projectYear <= year && projectYear > nextYear;
                    })}
                  />
                </div>
              </div>
            </ScrollElement>
          )}
        </Container>

        <div className="spacer" />

        <style jsx>{`
          .spacer {
            // height: 100vh;
          }
          .firstSection {
            // So the first section is active in the nav at the top of the page
            padding-top: 300px;
            margin-top: -300px;
          }
          .project-collection {
            background: radial-gradient(${colors.black} 15%, transparent 16%),
              radial-gradient(${colors.black} 15%, transparent 16%),
              ${colors.lightGrey};
            background-size: 7px 7px;
            padding-bottom: ${spacing.s4};
            margin-bottom: ${spacing.s3};
          }
        `}</style>
      </div>
    );
  }
}
