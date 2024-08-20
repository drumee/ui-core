module.exports = function (_ui_) {
  return Skeletons.Box.Y({
    className: `${_ui_.fig.family}__main`,
    debug: __filename,
    kids: [
      Skeletons.Element({
        tagName: 'canvas',
        className: `${_ui_.fig.family}__content`,
        sys_pn: 'canvas',
        attributes: {
          id: `${_ui_._id}-canvas`
        }
      })
    ]
  });
}