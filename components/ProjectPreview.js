import Link from "next/link";
import Image from "~/components/Image";
import { weights, spacing, colors, COLUMN_SPACING } from "~/components/theme";

export default ({ project }) =>
  <div className="root">
    <Link
      as={`/project/${project.slug}`} // URL exposed to the browser
      href={`/project?slug=${project.slug}`} // simplified URL for next.js client routing
      prefetch
    >
      <a className="project-preview">
        <Image image={project.thumbnailImage} />
        <p className="date">
          {project.date}
        </p>
        <p className="project-title">
          {project.title}
        </p>
      </a>
    </Link>
    <style jsx>{`
      .root {
        padding-bottom: ${spacing.s1};
        position: relative;
        padding-right: ${COLUMN_SPACING}px;
        padding-left: ${COLUMN_SPACING}px;
      }
      .root::before {
        z-index: 0;
        content: '';
        position: absolute;
        background: ${colors.lightGrey};
        left: -${COLUMN_SPACING}px;
        right: -${COLUMN_SPACING}px;
        top: 0;
        bottom: 0;
      }

      .project-preview {
        position: relative;
        z-index: 1;
      }

      .date {
        font-weight: ${weights.bold};
      }
      .project-title {
        text-transform: uppercase;
      }
    `}</style>
  </div>;
