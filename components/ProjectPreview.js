import Link from 'next/link';
import { RichText } from 'prismic-dom';

import Image from '~/components/Image';
import {
  fonts,
  weights,
  spacing,
  colors,
  lineHeights,
  COLUMN_SPACING,
} from '~/lib/theme';

const ProjectPreview = ({ project, firstSection }) => (
  <div className="root">
    <Link
      as={`/project/${project.uid}`} // URL exposed to the browser
      href={`/project?slug=${project.uid}`} // simplified URL for next.js client routing
      prefetch={firstSection}
    >
      <a className="project-preview">
        <Image image={project.main_image} />
        <p className="date">
          {project.year_text || new Date(project.date).getFullYear()}
        </p>
        <p className="project-title">{RichText.asText(project.title)}</p>
      </a>
    </Link>
    <style jsx>{`
      .root {
        position: relative;
        padding: 0 ${COLUMN_SPACING}px ${spacing.s2} ${COLUMN_SPACING}px;
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
        margin: ${spacing.s1} 0 ${spacing.s05};
        font-weight: ${weights.bold};
        font-size: ${fonts.f14};
      }
      .project-title {
        margin: 0;
        text-transform: uppercase;
        font-size: ${fonts.f15};
        line-height: ${lineHeights.heading};
        padding-bottom: ${spacing.s05};
      }
    `}</style>
  </div>
);

export default ProjectPreview;
