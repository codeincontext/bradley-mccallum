import Head from "next/head";
import Header from "~/components/header";

export default () =>
  <div>
    <Head>
      <title>Home</title>
    </Head>
    <Header />
    Hello world
    <p>scoped!</p>
    <style jsx>{`
      p {
        color: blue;
      }
      div {
        background: red;
      }
      @media (max-width: 600px) {
        div {
          background: blue;
        }
      }
    `}</style>
  </div>;
