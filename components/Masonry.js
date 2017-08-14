import chunk from "lodash.chunk";
import zip from "lodash.zip";
// import { scrollNameForProject } from '~/lib/scrollNames';
import ProjectPreview from "~/components/ProjectPreview";
import { spacing, COLUMN_SPACING } from "~/components/theme";

export default ({ projects }) =>
  <div className="root">
    {zip(...chunk(projects, 3)).map(column =>
      <div className="column">
        {column.map(project => project && <ProjectPreview project={project} />)}
      </div>
    )}
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
  </div>;
