
// Firefox 27 / Windows 7 x64
var USER_AGENT = "Mozilla/5.0 (Windows NT 6.2; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0";

// UserAgent ‚ð‹U‘•‚·‚é
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details){
    for(var i=0; i<details.requestHeaders.length; i++){
      var header = details.requestHeaders[i];
      
      if(header.name == "User-Agent"){
        header.value = USER_AGENT;
        break;
      }
    }
    
    return { requestHeaders:details.requestHeaders };
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
