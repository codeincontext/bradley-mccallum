import Head from 'next/head';
import cx from 'classnames';

import {
  colors,
  weights,
  spacing,
  fonts,
  letterSpacing,
  PAGE_TOP_PADDING,
} from '~/lib/theme';
import { initAnalytics } from '~/lib/analytics';

initAnalytics();

const Layout = ({ children, topPadding = true }) => (
  <div>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=850" />
      <link
        href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,400i,700"
        rel="stylesheet"
      />

      <script async src="https://www.google-analytics.com/analytics.js" />
    </Head>

    <style global jsx>{`
      html {
        height: 100%;
      }

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

      p {
        margin: ${spacing.s1} 0;
      }
    `}</style>

    <div className={cx('content', { 'top-padding': topPadding })}>
      {children}
    </div>

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

      .content.top-padding {
        padding-top: ${PAGE_TOP_PADDING}px;
      }
    `}</style>
  </div>
);

export default Layout;
