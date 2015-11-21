!function() {
  'use strict';

  var PORTAL_LOGOUT_URL        = '/Portal/logout.aspx';
  var PORTAL_ENTER_URL         = 'http://portal1.kochi-tech.ac.jp/';
  var PORTAL_LOGOUT_URL_REGEXP = /\/Portal\/logout\.aspx$/;

  if (PORTAL_LOGOUT_URL_REGEXP.test(location.href)) {
    chrome.runtime.sendMessage({ action: 'logout' }, function (response) {
      location.href = PORTAL_ENTER_URL;
    });
  }

  var loginLink = document.getElementById('error_lnkLogin');

  if (loginLink) {
    loginLink.href = PORTAL_LOGOUT_URL;
  }
}();
