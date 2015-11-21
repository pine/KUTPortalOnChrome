
// Firefox 42 / Mac OS X
var USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:42.0) Gecko/20100101 Firefox/42.0";

// UserAgent を偽装する
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details){
    for(var i = 0; i < details.requestHeaders.length; i++){
      var header = details.requestHeaders[i];

      if(header.name == "User-Agent"){
        header.value = USER_AGENT;
        break;
      }
    }

    return { requestHeaders: details.requestHeaders };
  },
  {
    urls: [
      "*://portal1.kochi-tech.ac.jp/*",
      "*://portal2.kochi-tech.ac.jp/*",
      "*://idp.kochi-tech.ac.jp/*"
    ]
  },
  [
    "requestHeaders",
    "blocking"
  ]
);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action !== 'logout') { return; }

  // Cookie を削除

  // Cookie 削除対象 URL
  var cookie_domains = [
    "portal1.kochi-tech.ac.jp",
    "portal2.kochi-tech.ac.jp",
    "idp.kochi-tech.ac.jp"
  ];

  var removing_count = 0;
  var removed_count  = 0;

  cookie_domains.forEach(function(domain){
    // 全ての Cookie の情報を取得
    chrome.cookies.getAll(
      { domain: domain },
      function(cookies){

        // 全ての Cookie を削除
        cookies.forEach(function(cookie){
          var remove_detail = {
            url: "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path,
            name: cookie.name,
          };

          removing_count++;
          chrome.cookies.remove(remove_detail, function () {
            removed_count++;

            if (removed_count === removing_count) {
              sendResponse({ message: 'ok' });
            }
          });
        });
      }
    );
  });

  return true;
});
