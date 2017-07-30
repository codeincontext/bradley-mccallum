const MAX_WIDTH = 960;

export default ({ children }) =>
  <div>
    {children}
    <style jsx>{`
      div {
        max-width: ${MAX_WIDTH}px;
      }
    `}</style>
  </div>;
