import chunk from "lodash.chunk";
import zip from "lodash.zip";
// import { scrollNameForProject } from '~/lib/scrollNames';
import ProjectPreview from "~/components/ProjectPreview";

export default ({ projects }) =>
  <div className="root">
    {zip(...chunk(projects, 3)).map(column =>
      <div className="column">
        {column.map(project => project && <ProjectPreview project={project} />)}
      </div>
    )}
    <style jsx>{`
      .root {
        // height: calc(5010px/3);
        display: flex;
        // flex-direction: column;
        // flex-wrap: wrap;
      }
      .column {
        width: calc(100% / 3);
      }
    `}</style>
  </div>;
