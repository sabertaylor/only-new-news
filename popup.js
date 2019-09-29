$("#bg-colorpicker").spectrum({
  color: "#000"
});

$("#bg-colorpicker").spectrum({
  change: function (color) {
    let color2 = color.toHexString();
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        { code: 'document.body.style.backgroundColor = "' + color2 + '"; $(".k4w").attr("style", "color:'  + color2 + '; background-color:#fff")' });
        //$( ".myClass" ).
    });
  }
});

$("#fg-colorpicker").spectrum({
  color: "#000"
});

$("#fg-colorpicker").spectrum({
  change: function(color) {
    let color2 = color.toHexString();
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        { code: 'document.body.style.color = "' + color2 + '";' });
    });  
  }
});

// <span class="k4w" id="761530" style="color:#000; background-color:#fff">shield!”</span>
