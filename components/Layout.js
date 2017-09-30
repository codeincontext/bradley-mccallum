import Head from 'next/head';
import { colors, weights, spacing, fonts, letterSpacing } from '~/lib/theme';

const Layout = ({ children }) => (
  <div>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,400i,700"
        rel="stylesheet"
      />
    </Head>

    <style global jsx>{`
      body {
        font-family: 'Lato', sans-serif;
        font-weight: ${weights.light};
        background: ${colors.lightGrey};
        margin: 0;
        padding: 0;
        // disable ligatures like 'fi' as they ignore letter spacing
        font-variant-ligatures: none;
      }

      a {
        color: ${colors.black};
        text-decoration: none;
      }

      * {
        box-sizing: border-box;
        letter-spacing: ${letterSpacing.regular};
      }
    `}</style>

    {children}

    <p className="copyright">
      &copy; Bradley McCallum {new Date().getFullYear()}
    </p>

    {/* Used by react-intersection-observer */}
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=IntersectionObserver" />

    <style jsx>{`
      .copyright {
        font-size: ${fonts.f12};
        margin: ${spacing.s4} 0 ${spacing.s05};
        text-align: center;
      }
    `}</style>
  </div>
);

export default Layout;
