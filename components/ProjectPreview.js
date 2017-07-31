import Link from "next/link";

import Image from "~/components/Image";

export default ({ project }) =>
  <div className="root">
    <Link
      as={`/project/${project.slug}`} // URL exposed to the browser
      href={`/project?slug=${project.slug}`} // simplified URL for next.js client routing
      prefetch
    >
      <a>
        <Image image={project.thumbnailImage} />
        {project.title}
      </a>
    </Link>

    <style jsx>{`
      .root {
      }
    `}</style>
  </div>;
