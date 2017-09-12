import { CONTAINER_WIDTH, SIDEBAR_WIDTH } from '~/lib/theme';

const Container = ({ children, width }) => (
  <div className="root">
    <div className="inner" style={width ? { maxWidth: `${width}px` } : {}}>
      {children}
    </div>
    <style jsx>{`
      .root {
        margin-left: ${SIDEBAR_WIDTH}px;
      }

      .inner {
        max-width: ${CONTAINER_WIDTH}px;
        margin: 0 auto;
        padding: 0 20px;
      }
    `}</style>
  </div>
);

export default Container;
