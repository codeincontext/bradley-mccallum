import chunk from 'lodash.chunk';
import zip from 'lodash.zip';
import ProjectPreview from '~/components/ProjectPreview';
import { COLUMN_SPACING } from '~/lib/theme';

const Masonry = ({ projects, firstSection }) => (
  <div className="root">
    {zip(...chunk(projects, 3)).map((column, i) => (
      <div className="column" key={i}>
        {column.map(
          project =>
            project && (
              <ProjectPreview
                project={project}
                firstSection={firstSection}
                key={project.uid}
              />
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
