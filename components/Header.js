import Link from "next/link";

import Container from "~/components/Container";
import { fonts, colors, weights, spacing } from "~/components/theme";

export default () =>
  <header>
    <Link href="/" prefetch>
      <div className="name">Bradley McCallum</div>
    </Link>

    <nav>
      <Link href="/" prefetch activeClass="active-nav-link">
        <a>Home</a>
      </Link>
      <Link href="/" prefetch activeClass="active-nav-link">
        <a>Artworks</a>
      </Link>
      <Link href="/exhibitions" prefetch activeClass="active-nav-link">
        <a>Exhibitions</a>
      </Link>
      <Link href="/bibliography" prefetch activeClass="active-nav-link">
        <a>Bibliography</a>
      </Link>
      <Link href="/about" prefetch activeClass="active-nav-link">
        <a>About</a>
      </Link>
      <Link href="/contact" prefetch activeClass="active-nav-link">
        <a>Contact</a>
      </Link>
    </nav>

    <style jsx>{`
      header {
        display: flex;
        justify-content: space-between;
        background: ${colors.lightGrey};
        position: relative;
      }
      .name {
        padding: ${spacing.s2};
        font-weight: ${weights.bold};
        font-size: ${fonts.f20};
        letter-spacing: 1.75px;
      }
      nav {
        padding: ${spacing.s2} ${spacing.s2} 0;
      }
      nav a {
        padding-left: ${spacing.s2};
        text-transform: uppercase;
      }
      .active-nav-link {
        font-weight: ${weights.bold};
      }
    `}</style>
  </header>;
