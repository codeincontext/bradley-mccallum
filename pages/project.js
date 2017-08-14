import { Component } from "react";
import Head from "next/head";
import { Element as ScrollElement } from "react-scroll";
import Prismic from "prismic-javascript";
import PrismicDom from "prismic-dom";

import { getApi } from "~/lib/prismic";
import { scrollNameForExhibitionId } from "~/lib/scrollNames";
import PageMeta from "~/components/PageMeta";
import Header from "~/components/Header";
import Container from "~/components/Container";
import ContentItem from "~/components/ContentItem";
import Sidebar from "~/components/Sidebar";
import RichText from "~/components/RichText";
import { fonts, weights, spacing, colors } from "~/components/theme";

export default class extends Component {
  static async getInitialProps({ req, query }) {
    const api = await getApi(req);
    const project = await api.getByUID("project", query.slug);
    const exhibitionIds = project.data.exhibitions.map(e => e.exhibition.id);
    const exhibitions = (await api.getByIDs(exhibitionIds)).results.map(e => ({
      uid: e.uid,
      ...e.data,
    }));

    return {
      project: { uid: project.uid, ...project.data },
      exhibitions,
    };
  }

  render() {
    const { project, exhibitions } = this.props;
    console.log(project);
    console.log(exhibitions);

    return (
      <div>
        <Head>
          <title>Projects</title>
        </Head>
        <PageMeta />
        <Header />

        <div className="project-page">
          <div className="sidebar">
            <Sidebar
              items={[
                {
                  label: PrismicDom.RichText.asText(project.title),
                  scrollName: "artwork",
                },
                { label: "Exhibitions", scrollName: "exhibitions" },
                ...exhibitions.map(exhibition => ({
                  label: exhibition.location,
                  scrollName: scrollNameForExhibitionId(exhibition.uid),
                })),
                { label: "Press", scrollName: "press" },
                { label: "Acknowledgements", scrollName: "acknowledgements" },
              ]}
            />
          </div>
          <div className="project-content">
            <ScrollElement name="artwork">
              <section className="first-section">
                <Container>
                  <h1>
                    {PrismicDom.RichText.asText(project.title)}
                  </h1>
                  <p>
                    {project.materials}
                  </p>
                  <p>
                    {new Date(project.date).getFullYear()}
                  </p>
                  {project.collaborators &&
                    <p>
                      {project.collaborators}
                    </p>}
                  <p>
                    Project website:{" "}
                    <a href="{project.websiteLinkUrl}">
                      {project.websiteLinkText}
                    </a>
                  </p>
                </Container>

                {(project.body || [])
                  .map(contentItem =>
                    <ContentItem
                      item={contentItem} /* key={contentItem.sys.id} */
                    />
                  )}
              </section>
            </ScrollElement>
            <Container>
              <ScrollElement name="exhibitions">
                <section>
                  <div className="heading">
                    <h2>Exhibitions</h2>
                  </div>
                </section>
              </ScrollElement>
            </Container>

            {exhibitions.map(exhibition =>
              <ScrollElement
                name={scrollNameForExhibitionId(exhibition.uid)}
                key={exhibition.uid}
              >
                <section>
                  <Container>
                    <h3>
                      {exhibition.location}
                    </h3>
                    <p>
                      {new Date(exhibition.date).getFullYear()}
                    </p>
                  </Container>
                  {(exhibition.body || []).map(contentItem =>
                    <ContentItem
                      item={contentItem}
                      // key={contentItem.sys.id}
                    />
                  )}
                </section>
              </ScrollElement>
            )}
            <Container>
              <ScrollElement name="press">
                <section>
                  <div className="heading">
                    <h2>Press</h2>
                  </div>
                  {(project.pressItems || []).map(contentItem => null)}
                </section>
              </ScrollElement>
            </Container>
            <Container>
              <ScrollElement name="acknowledgements">
                <section>
                  <div className="heading">
                    <h2>Acknowledgements</h2>
                  </div>
                  <RichText text={project.acknowledgements} />
                </section>
              </ScrollElement>
            </Container>
          </div>
        </div>
        <style jsx>{`
          .project-page {
            display: flex;
          }
          .project-content {
            margin-left: ${spacing.s5};
          }
          .sidebar {
            width: 30%;
          }
          h1 {
            font-weight: ${weights.bold};
          }
          .heading {
            background: radial-gradient(${colors.black} 15%, transparent 16%),
              radial-gradient(${colors.black} 15%, transparent 16%),
              ${colors.lightGrey};
            background-size: 7px 7px;
            padding-top: ${spacing.s2};
            margin-bottom: ${spacing.s2};
          }
          .heading h2 {
            font-weight: ${weights.light};
            font-size: ${fonts.f24};
            text-transform: uppercase;
            letter-spacing: 2px;
            display: inline-block;
            margin: 0;
            padding: ${spacing.s05};
            background-color: ${colors.lightGrey};
          }
          section {
            /* Contain heading margin in section to prevent a gap between sections */
            overflow: auto;
          }
          .first-section {
            padding-top: 300px;
            margin-top: -332px;
          }
          .materials {
            text-transform: uppercase;
          }
          .acknowledgements {
            /* Ensure enough footer space to scroll to the bottom */
            min-height: 100vh;
          }
        `}</style>
      </div>
    );
  }
}
