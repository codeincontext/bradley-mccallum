import chunk from 'lodash.chunk';
import zip from 'lodash.zip';
import ProjectPreview from '~/components/ProjectPreview';
import { COLUMN_SPACING } from '~/lib/theme';

const Masonry = ({ projects, firstSection }) => (
  <div className="root">
    {zip(...chunk(projects, 3)).map(column => (
      <div className="column">
        {column.map(
          project =>
            project && (
              <ProjectPreview project={project} firstSection={firstSection} />
            )
        )}
      </div>
    ))}
    <style jsx>{`
      .root {
        display: flex;
        margin-left: -${COLUMN_SPACING}px;
        margin-right: -${COLUMN_SPACING}px;
      }
      .column {
        width: calc(100% / 3);
      }
    `}</style>
  </div>
);

export default Masonry;
