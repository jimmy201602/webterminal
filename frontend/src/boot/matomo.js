import Vue from 'vue'
import VueMatomo from 'vue-matomo'
import router from '../router'

Vue.use(VueMatomo, {
  host: 'http://193.112.194.114:8002',
  siteId: 2,

  // Enables automatically registering pageviews on the router
  router: router,

  // Enables link tracking on regular links. Note that this won't
  // work for routing links (ie. internal Vue router links)
  // Default: true
  enableLinkTracking: true,

  // Require consent before sending tracking information to matomo
  // Default: false
  requireConsent: false,

  // Whether to track the initial page view
  // Default: true
  trackInitialView: true,

  // Run Matomo without cookies
  // Default: false
  disableCookies: false,

  // Enable the heartbeat timer (https://developer.matomo.org/guides/tracking-javascript-guide#accurately-measure-the-time-spent-on-each-page)
  // Default: false
  enableHeartBeatTimer: true,

  // Set the heartbeat timer interval
  // Default: 15
  heartBeatTimerInterval: 5,

  // Changes the default .js and .php endpoint's filename
  // Default: 'matomo'
  trackerFileName: 'matomo',

  // Overrides the tracker endpoint entirely
  // Default: undefined
  trackerUrl: undefined,

  // Overrides the tracker script path entirely
  // Default: undefined
  trackerScriptUrl: undefined,

  // Whether or not to log debug information
  // Default: false
  debug: true,

  // User ID
  // Default: undefined
  userId: 'webterminal vue',

  preInitActions: [
    ['setCustomVariable', '1', 'VisitorType', 'Member'],
    ['appendToTrackingUrl', 'new_visit=1']
  ]
})

Vue.config.productionTip = false
