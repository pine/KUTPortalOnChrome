
// Firefox 31 / Windows 8
var USER_AGENT = "Mozilla/5.0 (Windows NT 6.2; WOW64; rv:31.0) Gecko/20100101 Firefox/31.0";

var PORTAL_ENTER_URL = 'http://portal.kochi-tech.ac.jp/';

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
      "https://portal1.kochi-tech.ac.jp/*",
      "https://portal2.kochi-tech.ac.jp/*",
      "https://idp.kochi-tech.ac.jp/*"
    ]
  },
  [
    "requestHeaders",
    "blocking"
  ]
);

chrome.webRequest.onHeadersReceived.addListener(
  function(details){
    // Cookie を削除
    
    // Cookie 削除対象 URL
		var cookie_urls = [
			"https://portal1.kochi-tech.ac.jp/",
			"https://portal2.kochi-tech.ac.jp/",
			"https://idp.kochi-tech.ac.jp/idp"
		];
		
		cookie_urls.forEach(function(url){
			var cookie_details = {
				url: url
			};
			
			// 全ての Cookie の情報を取得
			chrome.cookies.getAll(
				cookie_details,
				function(cookies){
					// 全ての Cookie を削除
					cookies.forEach(function(cookie){
						chrome.cookies.remove({ url: url, name: cookie.name });
					});
				}
			);
		});
    
    // リダイレクト先を変更
    for(var i = 0; i < details.responseHeaders.length; i++){
      var header = details.responseHeaders[i];
      
      if(header.name == "Location"){
        header.value = PORTAL_ENTER_URL;
        break;
      }
    }
    
    return { responseHeaders: details.responseHeaders };
  },
	{
		urls: [
			// ログアウトページ
			"https://portal1.kochi-tech.ac.jp/Portal/logout.aspx",
			"https://portal2.kochi-tech.ac.jp/Portal/logout.aspx"
		]
	},
	[
    "responseHeaders",
    "blocking"
	]
);