window.SERVICE = require('./constants/services');
window.WARNING = require('./constants/warning');
window.ERROR = require('./constants/error');
window._a = require('./constants/attributes');
window._K = require('./constants/constants');
window._T = require('./constants/template');
window.KIND = require('./constants/kinds');
window._e = require('./constants/event');

require('./addons');œ


window.Preset = {
  Button: require('./toolkit/preset/button'),
  ConfirmButtons: require('./toolkit/preset/confirm-buttons'),
  List: require('./toolkit/preset/list-stream'),
  Utils: require('./toolkit/preset/utils')
};

window.Template = require('./toolkit/preset/template');
window.Skeletons = require('./toolkit');
window.Websocket = null;

window.Validator = require('./utils/validator');
window.Kind = require("./kind");
window.mouseDragged = false;

window.Platform = new Backbone.Model();
window.Env = new Backbone.Model();
window.Host = require('./host')();
window.Visitor = require('./user')();
window.Organization = require('./organization')();
