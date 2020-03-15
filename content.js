
if (window.location.href === "https://news.ycombinator.com/") {

  console.log("Did storage persist?");

  chrome.storage.local.get(['news'], function(result) {
      if (!result.news) {
        result.news = {};
      }

      console.log('Read ' + Object.keys(result.news).length + ' news identifiers from storage.');

      console.log("Loading current page's news identifiers.");
      let things = $('.athing')
      let now = Date.now();
      let news = {};
      things.each(function() { news[$(this).attr('id')] = now; });

      console.log('Hiding stories that have been seen before.');

      for(let i = 0; i <= Object.keys(result.news).length - 1; i++) {
        // For Hacker News cull any identifiers older than 1 day.
        if ((moment() - moment(news[Object.keys(result.news)[0]]) ) / (24 * 60 * 60 * 1000) > 1) {
          delete news[result.news[i]];
        }
      }
      
      for(let i = 0; i <= Object.keys(news).length - 1; i++) {
        if (result.news[Object.keys(news)[i]]) {
          // This news item is found have been seen more than five minutes ago.
          if ((moment() - moment(news[Object.keys(result.news)[0]]) ) / (60 * 1000) > 0.1) {
            $('#' + Object.keys(news)[i]).hide();
            $('#' + Object.keys(news)[i]).next().hide();
          }
        } else {
          // New news item, so save it away.
          result.news[Object.keys(news)[i]] = Object.values(news)[i];
        }
      }

      chrome.storage.local.set({'news': result.news}, function() {
         console.log(Object.keys(news).length + ' entries saved to storage.');
        });
    });

}
