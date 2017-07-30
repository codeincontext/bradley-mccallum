import Head from "next/head";
import Link from "next/link";

import Container from "~/components/Container";
import { colors, weights } from "~/components/theme";

export default () =>
  <header>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700"
        rel="stylesheet"
      />
    </Head>

    <style global jsx>{`
      body {
        font-family: 'Lato', sans-serif;
        font-weight: ${weights.light};
      }
    `}</style>

    <Container>
      <div>Bradley McCallum</div>

      <nav>
        <Link href="/" prefetch>
          <a>Artworks</a>
        </Link>
        <Link href="/exhibitions" prefetch>
          <a>Exhibitions</a>
        </Link>
        <Link href="/bibliography" prefetch>
          <a>Bibliography</a>
        </Link>
        <Link href="/about" prefetch>
          <a>About</a>
        </Link>
        <Link href="/contact" prefetch>
          <a>Contact</a>
        </Link>
      </nav>
    </Container>

    <style jsx>{`
      header {
        background: ${colors.white};
      }
      nav {
        width: 400px;
        display: flex;
        align-items: space-between;
      }
      a {
        text-transform: uppercase;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0;
      }
    `}</style>
  </header>;
