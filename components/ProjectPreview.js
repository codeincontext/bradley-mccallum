import Link from 'next/link';
import { RichText } from 'prismic-dom';

import Image from '~/components/Image';
import { weights, spacing, colors, COLUMN_SPACING } from '~/lib/theme';

export default ({ project, firstSection }) => (
  <div className="root">
    <Link
      as={`/project/${project.uid}`} // URL exposed to the browser
      href={`/project?slug=${project.uid}`} // simplified URL for next.js client routing
      prefetch={firstSection}
    >
      <a className="project-preview">
        <Image image={project.main_image} />
        <p className="date">{new Date(project.date).getFullYear()}</p>
        <p className="project-title">{RichText.asText(project.title)}</p>
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
  </div>
);
