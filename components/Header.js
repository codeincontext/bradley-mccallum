import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import cx from 'classnames';
import {
  fonts,
  colors,
  weights,
  spacing,
  zIndex,
  HEADER_HEIGHT,
  SCROLL_OFFSET,
} from '~/lib/theme';

const Header = ({ pathname, artworksActive }) => (
  <div>
    <header>
      {pathname === '/' ? (
        <ScrollLink
          to="top"
          className={cx('name', { active: artworksActive })}
          smooth
          duration={500}
        >
          Bradley McCallum
        </ScrollLink>
      ) : (
        <Link href="/" prefetch>
          <a className="name">Bradley McCallum</a>
        </Link>
      )}

      <nav>
        {pathname === '/' ? (
          <ScrollLink
            to="artworks"
            className={artworksActive && 'active'}
            smooth
            duration={500}
            offset={SCROLL_OFFSET}
          >
            Artworks
          </ScrollLink>
        ) : (
          <Link href="/" prefetch>
            <a className={pathname.startsWith('/project') && 'active'}>Artworks</a>
          </Link>
        )}

        <Link href="/exhibitions" prefetch>
          <a className={pathname === '/exhibitions' && 'active'}>Exhibitions</a>
        </Link>
        <Link href="/bibliography" prefetch>
          <a className={pathname === '/bibliography' && 'active'}>
            Bibliography
          </a>
        </Link>
        <Link href="/about" prefetch>
          <a className={pathname === '/about' && 'active'}>About</a>
        </Link>
        <Link href="/contact" prefetch>
          <a className={pathname === '/contact' && 'active'}>Contact</a>
        </Link>
      </nav>
    </header>
    <div className="header-placeholder" />

    <style jsx>{`
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: ${colors.lightGrey};
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: ${HEADER_HEIGHT}px;
        z-index: ${zIndex.header};
        border-bottom: 1px solid #e4e4e4;
      }

      .header-placeholder {
        // An element to take up the header's height in the page flow
        height: ${HEADER_HEIGHT}px;
      }

      header :global(.name) {
        padding: 0 ${spacing.s2};
        font-weight: ${weights.bold};
        font-size: ${fonts.f20};
        letter-spacing: 1.75px;
        transform: translateY(-5px);
      }

      nav {
        padding: 0 ${spacing.s2};
      }

      nav :global(a) {
        margin-left: ${spacing.s2};
        text-transform: uppercase;
        position: relative;
        font-size: ${fonts.f14};
        cursor: pointer;
      }
      nav :global(a.active) {
        font-weight: ${weights.bold};
      }
      nav :global(.active):after {
        content: '';
        display: block;
        position: absolute;
        left: 1px;
        bottom: -${spacing.s05};
        background: ${colors.black};
        width: 1.5rem;
        height: ${spacing.s025};
      }
    `}</style>
  </div>
);

export default Header;
