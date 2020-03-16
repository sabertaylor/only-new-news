function Log(line) {
  if (true) {
    console.log('No New News extension: ' + line);
  }
}

function HideOldStories(storageKey, cssClass) {
  Log("Did storage persist?");

  chrome.storage.local.get([storageKey], function(result) {
      if (!result[storageKey]) {
        result[storageKey] = {};
      }

      let oldNews = result[storageKey];

      Log('Read ' + Object.keys(oldNews).length + ' news identifiers from storage.');

      let things = $(cssClass)
      let now = Date.now();
      let news = {};
      things.each(function() { news[$(this).attr('id')] = now; });
      Log("Found " + Object.keys(news).length + " news identifiers in current page.");

      let culled = 0;
      for (const [key, value] of Object.entries(oldNews)) {
        // Cull any identifiers older than 1 day.
        // It's ok to show the link again after that much time.
        if ((moment() - moment(oldNews[key]) / (24 * 60 * 60 * 1000)) > 1) {
          culled++;
          delete oldNews[key];
        }
      }
      Log("Deleted " + culled + " news identifiers for being too old.")
      
      let hid = 0;
      for (const [key, value] of Object.entries(news)) {
        if (oldNews[key]) {
          // This news item is found have been seen more than five minutes ago.
          if ((moment() - moment(oldNews[key]) ) / (60 * 1000) > 5) {
            hid++;
            $('#' + key).hide();
            if (cssClass = '.athing') {
              $('#' + key).next().hide();
            }
          }
        } else {
          // New news item, so save it away.
          oldNews[key] = value;
        }
      }
      Log('Hid ' + hid + ' stories that have been seen before.');

      chrome.storage.local.set({storageKey: oldNews}, function() {
         Log(Object.keys(oldNews).length + ' entries saved to storage.');
        });
    });
}

if (window.location.href === "https://news.ycombinator.com/") {
  HideOldStories('hnNews', '.athing');
} else if (window.location.href === "https://old.reddit.com/") {
  HideOldStories('redNews', '.thing');
}
