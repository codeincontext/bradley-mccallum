const GOOGLE_ANALYTICS_UA = 'UA-107339535-1';

export function initAnalytics() {
  if (typeof window === 'undefined' || window.ga) {
    return;
  }

  window.ga =
    window.ga ||
    function() {
      (ga.q = ga.q || []).push(arguments);
    };
  ga.l = +new Date();
  ga('create', GOOGLE_ANALYTICS_UA, 'auto');

  require('autotrack/autotrack.js');
  ga('require', 'urlChangeTracker');
  ga('require', 'outboundLinkTracker');
  ga('require', 'maxScrollTracker');
  ga('send', 'pageview');
}
