
const { View } = require("backbone.marionette");
class __canvas_wrapper extends View {
  static initClass() {
    this.prototype.tagName = _T.wrapper.canvas;
    this.prototype.className = "widget canvas-wrapper";
  }

  /**
   * 
   * @returns 
   */
  initialize() {
    super.initialize();
    this._id = _.uniqueId("canvas-");
    this._start = this._start.bind(this);
    this.model.set({
      widgetId: this._id,
      innerClass: _K.char.empty,
      width: _K.size.full,
      height: _K.size.full
    });
  }

  /**
   * 
   * @returns 
   */
  _start() {
    this.debug("initCanvas", this, this.$el.width(), this.$el.height());
    this._canvas = document.getElementById(this._id);
    this._canvas.width = this.$el.width();
    this._canvas.height = this.$el.height();
    const ctx = this._canvas.getContext('2d');
    this.context = ctx;
    const f = () => {
      if (this.model.get(_a.src)) {
        const img = new Image;
        img.onload = () => ctx.drawImage(img, 0, 0);
        return img.src = this.model.get(_a.src);
      }
    };
    return this.waitElement(this.context, f);
  }

  /**
   * 
   */
  onDomRefresh() {
    this.waitElement(this.el, this._start);
  }


  /**
   * 
   * @returns 
   */
  line() {
    const ctxt = this.context;
    if ((ctxt == null)) {
      this.warn("CONTEXT NOT FOUND");
      return;
    }
    ctxt.beginPath();
    ctxt.setLineDash([5, 5]);
    ctxt.moveTo(100, 150);
    ctxt.lineTo(450, 50);
    ctxt.strokeStyle = "#FF0000";
    ctxt.stroke();
    ctxt.beginPath();
    ctxt.setLineDash([10, 15]);
    ctxt.moveTo(100, 150);
    ctxt.lineTo(450, 50);
    ctxt.strokeStyle = "#00FF00";
    ctxt.stroke();
  }

  /**
   * 
   * @param {*} lines 
   * @returns 
   */
  lines(lines) {
    const ctxt = this.context;
    if ((ctxt == null)) {
      this.warn("CONTEXT NOT FOUND");
      return;
    }
    ctxt.clearRect(0, 0, this._canvas.width, this._canvas.height);
    for (var l of Array.from(lines)) {
      ctxt.beginPath();
      if (l.dash != null) {
        ctxt.setLineDash(l.dash);
      }
      ctxt.moveTo(l.from.x, l.from.y);
      ctxt.lineTo(l.to.x, l.to.y);
      ctxt.strokeStyle = l.style;
      ctxt.stroke();
    }
  }
}
__canvas_wrapper.initClass();

module.exports = __canvas_wrapper;
