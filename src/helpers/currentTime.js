const Handlebars = require("handlebars");

function twoDigitsString(int) {
  return String(int).padStart(2, "0");
}
function getTime(options) {
  const d = new Date(options.hash.date || Date.now());
  return `${twoDigitsString(d.getHours())}:${twoDigitsString(d.getMinutes())}`;
}

Handlebars.registerHelper("getTime", getTime);
