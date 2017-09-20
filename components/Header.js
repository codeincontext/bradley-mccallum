import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import { fonts, colors, weights, spacing, zIndex } from '~/lib/theme';

const Header = ({ pathname, artworksActive }) => (
  <div>
    <header>
      <Link href="/" prefetch>
        <div className="name">Bradley McCallum</div>
      </Link>

      <nav>
        {pathname === '/' ? (
          <ScrollLink
            to="artworks"
            className={artworksActive && 'active'}
            smooth
            duration={500}
          >
            Artworks
          </ScrollLink>
        ) : (
          <Link href="/" prefetch>
            <a>Artworks</a>
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
      nav :global(a) {
        margin-left: ${spacing.s2};
        text-transform: uppercase;
        position: relative;
      }
      nav :global(.active) {
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
