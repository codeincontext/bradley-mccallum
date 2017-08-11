import { CALLOUT_WIDTH } from "~/components/theme";

export default ({ item }) =>
  <p className="root">
    {item.text}
    <style jsx>{`
      .root {
        max-width: ${CALLOUT_WIDTH};
        margin-left: auto;
        margin-right: auto;
      }
    `}</style>
  </p>;
