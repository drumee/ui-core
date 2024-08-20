const { Progress } = require("../toolkit");
const Avatar = require("./avatar");
const List = {
  Smart: require("./list/smart"),
  Table: require("./list/table")
}
module.exports = {
  Avatar,
  ImageSmart: require("./image/smart"),
  ImageSvg: require("./image/svg"),
  LetcBlank: require("./blank"),
  LetcBox: require("./box"),
  LetcButton: require("./button"),
  LetcList: List.Smart,
  LetcMenu: require("./menu"),
  LetcText: require("./text"),
  List,
  Progress:require("./progress"),
  Spinner:require("./spinner"),
  Svg:require("./svg"),
};
