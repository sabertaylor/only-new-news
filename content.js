
if (window.location.href === "https://news.ycombinator.com/") {

  console.log("Did storage persist?");

  chrome.storage.local.get(['hnNews'], function(result) {
      if (!result.hnNews) {
        result.hnNews = {};
      }

      console.log('Read ' + Object.keys(result.hnNews).length + ' news identifiers from storage.');

      let things = $('.athing')
      let now = Date.now();
      let news = {};
      things.each(function() { news[$(this).attr('id')] = now; });
      console.log("Found " + Object.keys(news).length + " news identifiers in current page.");

      for(let i = 0; i <= Object.keys(result.hnNews).length - 1; i++) {
        // For Hacker News cull any identifiers older than 1 day.
        if ((moment() - moment(news[Object.keys(result.hnNews)[0]]) ) / (24 * 60 * 60 * 1000) > 1) {
          delete news[result.hnNews[i]];
        }
      }
      
      let hid = 0;
      for(let i = 0; i <= Object.keys(news).length - 1; i++) {
        let id = Object.keys(news)[i];
        if (result.hnNews[id]) {
          // This news item is found have been seen more than five minutes ago.
          if ((moment() - moment(result.hnNews[id]) ) / (60 * 1000) > 5) {
            hid++;
            $('#' + id).hide();
            $('#' + id).next().hide();
          }
        } else {
          // New news item, so save it away.
          result.hnNews[Object.keys(news)[i]] = Object.values(news)[i];
        }
      }
      console.log('Hid ' + hid + ' stories that have been seen before.');

      chrome.storage.local.set({'hnNews': result.hnNews}, function() {
         console.log(Object.keys(result.hnNews).length + ' entries saved to storage.');
        });
    });

} else if (window.location.href === "https://old.reddit.com/") {

  console.log("Did storage persist?");

  chrome.storage.local.get(['redNews'], function(result) {
      if (!result.redNews) {
        result.redNews = {};
      }

      console.log('Read ' + Object.keys(result.redNews).length + ' news identifiers from storage.');

      let things = $('.thing')
      let now = Date.now();
      let news = {};
      things.each(function() { news[$(this).attr('id')] = now; });
      console.log("Found " + Object.keys(news).length + " news identifiers in current page.");

      for(let i = 0; i <= Object.keys(result.redNews).length - 1; i++) {
        // For Hacker News cull any identifiers older than 1 day.
        if ((moment() - moment(news[Object.keys(result.redNews)[0]]) ) / (24 * 60 * 60 * 1000) > 1) {
          delete news[result.redNews[i]];
        }
      }
      
      let hid = 0;
      for(let i = 0; i <= Object.keys(news).length - 1; i++) {
        let id = Object.keys(news)[i];
        if (result.redNews[id]) {
          // This news item is found have been seen more than five minutes ago.
          if ((moment() - moment(result.redNews[id]) ) / (60 * 1000) > 5) {
            hid++;
            $('#' + id).hide();
            $('#' + id).next().hide();
          }
        } else {
          // New news item, so save it away.
          result.redNews[Object.keys(news)[i]] = Object.values(news)[i];
        }
      }
      console.log('Hid ' + hid + ' stories that have been seen before.');

      chrome.storage.local.set({'redNews': result.redNews}, function() {
         console.log(Object.keys(result.redNews).length + ' entries saved to storage.');
        });
    });

}
