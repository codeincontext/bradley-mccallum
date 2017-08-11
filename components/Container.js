import { MAX_WIDTH } from "~/components/theme";

export default ({ children }) =>
  <div>
    {children}
    <style jsx>{`
      div {
        max-width: ${MAX_WIDTH}px;
        margin: 0 auto;
      }
    `}</style>
  </div>;
