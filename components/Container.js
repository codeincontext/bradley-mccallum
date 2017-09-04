import { MAX_WIDTH } from '~/lib/theme';

const Container = ({ children }) => (
  <div>
    {children}
    <style jsx>{`
      div {
        max-width: ${MAX_WIDTH}px;
        margin: 0 auto;
        padding: 0 20px;
      }
    `}</style>
  </div>
);

export default Container;
