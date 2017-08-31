import Link from 'next/link';
import { Link as ScrollLink, scrollSpy } from 'react-scroll';
import Container from '~/components/Container';
import { fonts, colors, weights, spacing, zIndex } from '~/components/theme';

export default ({ pathname }) => (
  <div>
    <header>
      <Link href="/" prefetch>
        <div className="name">Bradley McCallum</div>
      </Link>

      <nav>
        {pathname === '/' ? (
          <span>
            <ScrollLink
              to="home-header"
              className="nav-link"
              activeClass="active-nav-link"
              spy
              smooth
              duration={500}
            >
              Home
            </ScrollLink>
            {/* TODO: This is hard to do because react-scroll only lets you use one scrolllink per scrol element */}
            <ScrollLink
              className="nav-link"
              activeClass="active-nav-link"
              spy
              smooth
              duration={500}
            >
              Artworks
            </ScrollLink>
          </span>
        ) : (
          <span>
            <Link href="/" prefetch>
              <a>Home</a>
            </Link>
            <Link href="/" prefetch>
              <a>Artworks</a>
            </Link>
          </span>
        )}

        <Link href="/exhibitions" prefetch>
          <a className={pathname === '/exhibitions' && 'active-nav-link'}>
            Exhibitions
          </a>
        </Link>
        <Link href="/bibliography" prefetch>
          <a className={pathname === '/bibliography' && 'active-nav-link'}>
            Bibliography
          </a>
        </Link>
        <Link href="/about" prefetch>
          <a className={pathname === '/about' && 'active-nav-link'}>About</a>
        </Link>
        <Link href="/contact" prefetch>
          <a className={pathname === '/contact' && 'active-nav-link'}>
            Contact
          </a>
        </Link>
      </nav>
    </header>
    <div className="header-placeholder" />

    <style jsx>{`
      header {
        display: flex;
        justify-content: space-between;
        background: ${colors.lightGrey};
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: ${zIndex.header};
        border-bottom: 1px solid #e4e4e4;
      }
      .header-placeholder {
        height: 89px;
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
      nav a,
      :global(.nav-link) {
        padding-left: ${spacing.s2};
        text-transform: uppercase;
      }
      :global(.active-nav-link) {
        font-weight: ${weights.bold};
      }
    `}</style>
  </div>
);
