var gui = require('nw.gui');
var appWindow = gui.Window.get();

$(".window-button.close").on("click", function(e) {
  e.preventDefault();
  appWindow.close();
});

$(".window-button.minimize").on("click", function(e) {
  e.preventDefault();
  appWindow.minimize();
});

$(".window-button.maximize").on("click", function(e) {
  e.preventDefault();
  if ($(".window-button.maximize").data("is-maximized")) {
    appWindow.unmaximize();
    $(".window-button.maximize").data("is-maximized", false);
  } else {
    appWindow.maximize();
    $(".window-button.maximize").data("is-maximized", true);
  }
});

appWindow.show();