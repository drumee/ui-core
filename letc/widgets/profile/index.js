const { colorFromName } = require("@drumee/ui-essentials")
const LetcBox = require('../box');

const __cache = {};
class __user_profile extends LetcBox {

  /**
   * 
   * @param {*} opt 
   */
  initialize(opt) {
    require('./skin');
    super.initialize();
    this.model.atLeast({
      flow: _a.y
    });
    this.declareHandlers();
    let id = opt.id || opt.uid || opt.user_id || opt.drumate_id || opt.entity_id;
    this.mset({ id });
    if (opt.live_status) {
      this.updateStatus = this.updateStatus.bind(this);
      RADIO_BROADCAST.on(_e.peerData, this.updateStatus);
    }
  }


  /**
   * 
   */
  onBeforeDestroy() {
    if (this.mget(_a.live_status)) {
      RADIO_BROADCAST.off(_e.peerData, this.updateStatus);
    }
  }

  /**
   * 
   * @returns 
   */
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
    this.loadImage();
    if (window.Wm) {
      let data = Wm.getContactStatus(this.mget(_a.id));
      if (!data) return;
      this.mset(_a.online, data.status);
    }
    this.el.dataset.online = this.mget(_a.online);
  }

  /**
   * 
   */
  restart(clearCache) {
    if (clearCache) delete __cache[this.mget(_a.id)]
    this.onDomRefresh()
  }

  /**
   * 
   * @param {*} src 
   * @returns 
   */
  img() {
    const imageType = this.mget(_a.type) || _a.vignette
    const src = Visitor.avatar(this.mget(_a.id), imageType)
    return `
      <img class="${this.fig.family}__icon ${this.fig.family}__picture picture" data-flow="x" src="${src}">
    `
  }

  /**
   *
   * @param {*} m
    * @returns
    */
  _show(m) {
    if (m === 'p') {
      return this.__imageBox.el.innerHTML = this.img();
    }

    let opt = null;
    let initiales = this.initiales();
    if (this.mget('auto_color') != 0) {
      let bgColor = colorFromName((initiales || '??'));
      if (this.mget('oneLetter')) {
        bgColor = colorFromName((this.mget(_a.firstname) || '??'));
      }

      opt = {
        backgroundColor: bgColor
      }
    }
    if (initiales) {
      return this.__imageBox.feed(Skeletons.Note({
        content: initiales,
        className: `${this.fig.family}__icon ${this.fig.family}__initiales`,
        sys_pn: 'initiales',
        active: this.mget(_a.active),
        style: opt
      }));
    }
    this.__imageBox.feed(
      Skeletons.Element({
        className: `${this.fig.family}__icon ${this.fig.family}__initiales`,
        sys_pn: 'initiales',
        active: this.mget(_a.active),
        content: require('./templates/avatar').default(this),
        style: opt
      })
    )
  }


  /**
   * 
   */
  initiales() {
    // Never invent a letter. The previous form read `mget(firstname)[0] || '?'`,
    // so an EMPTY-STRING firstname (not a missing one — `''[0]` is undefined and
    // does not throw) became '?', and the lastname line copied that '?' through
    // its `|| firstname[0]` fallback: an entity whose name parts are both ''
    // rendered the literal "??" in its avatar. Worse, "??" is two characters
    // long, so it also defeated the two escape hatches below it — the whole-name
    // fallback (guarded on a zero-length result) and the empty-initials path in
    // _show() that draws the generic avatar. Callers legitimately pass '' when
    // they normalise a missing part (`mget(_a.firstname) || ''`), and some rows
    // genuinely have no parts at all while still naming the person in another
    // field, so a blank part has to mean "unknown", not "print punctuation".
    const letter = (v) => {
      if (v == null) return '';
      const s = `${v}`.trim();
      return s ? s[0] : '';
    };

    let firstname = letter(this.mget(_a.firstname));
    let lastname = letter(this.mget(_a.lastname));

    if (!firstname && !lastname) {
      // No name parts. Callers holding only a whole name put it in one of these
      // — `surname` (contacts, member services), `fullname`, `username` (a chat
      // or conference display name). Split it here so those surfaces derive the
      // SAME initials, and the same colorFromName() colour, as the ones that do
      // pass the parts.
      const whole = `${this.mget(_a.surname) || this.mget(_a.fullname)
        || this.mget(_a.username) || this.mget('display') || ''}`.trim();
      if (whole) {
        const [a, b] = whole.split(/[\s,]+/);
        firstname = letter(a);
        lastname = letter(b);
      }
    }

    // Genuinely nothing to show: return '' so _show() falls through to the
    // generic avatar template rather than printing punctuation at the user.
    return firstname + lastname;
  }

  /**
   * 
   */
  displayName() {
    if (!_.isEmpty(this.mget(_a.surname))) return this.mget(_a.surname);
    if (!_.isEmpty(this.mget(_a.username))) {
      let [firstname, lastname] = this.mget(_a.username).split(/[ ,]+/);
      this.mset({ firstname, lastname });
      return this.mget(_a.username);
    }
    let first = this.mget(_a.firstname);
    let last = this.mget(_a.lastname);
    let email = this.mget(_a.email).split('@')[0];
    if (_.isEmpty(first)) {
      return (last || email);
    }
    if (_.isEmpty(last)) {
      return (first || email);
    }
    return `${first} ${last}`;
  }

  /**
   * 
   */
  loadImage() {
    // Optimization : prevent reload when marked as error 
    if (__cache[this.mget(_a.id)]) {
      this.el.dataset.default = 1;
      this._show('i');
      return;
    }

    const img = new Image();
    img.onerror = this._onError.bind(this);

    img.onload = e => {
      this.el.dataset.quality = _a.high;
      this.el.dataset.default = 0;
      this._loaded = true;
      this._show('p');
    };

    const imageType = this.mget(_a.type) || _a.vignette
    img.src = Visitor.avatar(this.mget(_a.id), imageType);
  }

  /**
   *
   * @param {*} e
    */
  _onError(e) {
    __cache[this.mget(_a.id)] = 1;
    this.el.dataset.default = 1;
    return this._show('i');
  }


  /**
*
* @param {*} service
    * @param {*} data
    */
  updateStatus(data) {
    let id = data.id || data.user_id || data.drumate_id
    if (id != this.mget(_a.id)) return;
    this.el.dataset.online = data.status;
    this.mset({ online: data.status })
    this.trigger('status_changed', data);
  }

}


module.exports = __user_profile;
