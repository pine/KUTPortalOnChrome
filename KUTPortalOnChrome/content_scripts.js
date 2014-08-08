!function() {
  'use strict';
  
  var PORTAL_LOGOUT_URL = '/Portal/logout.aspx';
  
  var loginLink = document.getElementById('error_lnkLogin');
  
  if (loginLink) {
    loginLink.href = PORTAL_LOGOUT_URL;
  }
}();