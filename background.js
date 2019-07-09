chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      console.log(details)
      return {cancel: true}
    },
    {urls: ["*://*.localhost:*/*"]},
    ["blocking"]
);