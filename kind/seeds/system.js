const {
  Avatar,
  ImageSmart,
  ImageSvg,
  LetcBlank,
  LetcBox,
  LetcButton,
  LetcMenu,
  Progress,
  LetcText,
  List,
  Spinner,
  Svg
} = require("../../lib");

// Static Classes cannot be overloaded
module.exports = {
  avatar: Avatar,
  blank: LetcBlank,
  box: LetcBox,
  button: LetcButton,
  image_svg: ImageSvg,
  image_smart: ImageSmart,
  list_smart: List.Smart,
  list_table: List.Table,
  note: LetcText,
  progress: Progress,
  spinner: Spinner,
  svg_circle_percent: Svg.CirclePercent,
  svg_gradient_circle: Svg.GradientCircle,
  svg: ImageSvg,
  text: LetcText,
  wrapper: LetcBlank,
  menu_topic: LetcMenu
};;
