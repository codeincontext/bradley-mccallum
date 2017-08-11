import { Component } from "react";
import Head from "next/head";
import { Element as ScrollElement } from "react-scroll";

import { getClient } from "~/lib/contentful";
import { scrollNameForExhibition } from "~/lib/scrollNames";
import Header from "~/components/Header";
import Container from "~/components/Container";
import ContentItem from "~/components/ContentItem";
import Sidebar from "~/components/Sidebar";
import { weights } from "~/components/theme";

export default class extends Component {
  static async getInitialProps({ query }) {
    const entries = await getClient({ preview: !!query.preview }).getEntries({
      content_type: "project",
      "fields.slug": query.slug,
      include: 2,
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

        <Sidebar
          items={[
            { label: project.title, scrollName: "title" },
            { label: "Exhibitions", scrollName: "exhibitions" },
            ...project.exhibitions.map(exhibition => ({
              label: exhibition.fields.location,
              scrollName: scrollNameForExhibition(exhibition.sys.id),
            })),
            { label: "Press", scrollName: "press" },
            { label: "Acknowledgements", scrollName: "acknowledgements" },
          ]}
        />

        <ScrollElement name="title">
          <section className="firstSection">
            <Container>
              <h1>
                {project.title}
              </h1>
              <p className="materials">
                {project.materials}
              </p>
              <p className="collaborators">
                {project.collaborators}
              </p>
              <p className="year">
                {project.date}
              </p>
              {project.website &&
                <p className="website">
                  Project website: {project.website}
                </p>}
            </Container>

            {(project.content || [])
              .map(contentItem =>
                <ContentItem item={contentItem} key={contentItem.sys.id} />
              )}
          </section>
        </ScrollElement>

        <Container>
          <ScrollElement name="exhibitions">
            <section>
              <h2>Exhibitions</h2>

              {(project.exhibitionsContent || [])
                .map(contentItem =>
                  <ContentItem item={contentItem} key={contentItem.sys.id} />
                )}
            </section>
          </ScrollElement>
        </Container>

        {(project.exhibitions || [])
          .map(exhibition => exhibition.fields)
          .map(exhibition =>
            <ScrollElement
              name={scrollNameForExhibition(exhibition)}
              key={exhibition.slug}
            >
              <section>
                <Container>
                  <h3>
                    {exhibition.location}
                  </h3>
                  <p>
                    {exhibition.year}
                  </p>
                </Container>
                {(exhibition.content || [])
                  .map(contentItem =>
                    <ContentItem item={contentItem} key={contentItem.sys.id} />
                  )}
              </section>
            </ScrollElement>
          )}

        <Container>
          <ScrollElement name="press">
            <section>
              <h2>Press</h2>
              {(project.pressItems || []).map(contentItem => null)}
            </section>
          </ScrollElement>
        </Container>

        <Container>
          <ScrollElement name="acknowledgements">
            <section className="acknowledgements">
              <h2>Acknowledgements</h2>
            </section>
          </ScrollElement>
        </Container>

        <style jsx>{`
          h1 {
            font-weight: ${weights.bold};
          }
          section {
            /* Contain heading margin in section to prevent a gap between sections */
            overflow: auto;
          }
          .firstSection {
            padding-top: 300px;
            margin-top: -300px;
          }
          .materials {
            text-transform: uppercase;
          }
          .year {
            font-weight: ${weights.bold};
          }
          .collaborators {
            text-transform: uppercase;
          }
          .website {
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
