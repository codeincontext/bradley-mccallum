import chunk from 'lodash.chunk';
import zip from 'lodash.zip';
import { withContentRect } from 'react-measure';

import ProjectPreview from '~/components/ProjectPreview';
import { COLUMN_SPACING } from '~/lib/theme';

const TWO_COLUMN_MAX_WIDTH = 650;

const Masonry = ({ projects, firstSection, measureRef, contentRect }) => {
  const columnCount = contentRect.bounds.width < TWO_COLUMN_MAX_WIDTH ? 2 : 3;
  const projectColumns = zip(...chunk(projects, columnCount));

  return (
    <div className="root" ref={measureRef}>
      {projectColumns.map((column, i) => (
        <div style={{ width: `${100 / columnCount}%` }} key={i}>
          {column
            .filter(project => project)
            .map(project => (
              <ProjectPreview
                project={project}
                firstSection={firstSection}
                columnCount={columnCount}
                key={project.uid}
              />
            ))}
        </div>
      ))}
      <style jsx>{`
        .root {
          display: flex;
          margin-left: -${COLUMN_SPACING}px;
          margin-right: -${COLUMN_SPACING}px;
        }
      `}</style>
    </div>
  );
};

export default withContentRect('bounds')(Masonry);
