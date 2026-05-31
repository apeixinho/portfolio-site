const { icon } = require('@fortawesome/fontawesome-svg-core');
const {
  faHouse,
  faCircleUser,
  faGear,
  faCircle,
  faEnvelope,
  faDownload,
  faSquarePhone,
} = require('@fortawesome/free-solid-svg-icons');
const {
  faLinkedin,
  faGithub,
  faGitlab,
} = require('@fortawesome/free-brands-svg-icons');

const icons = {
  house: faHouse,
  'circle-user': faCircleUser,
  gear: faGear,
  circle: faCircle,
  envelope: faEnvelope,
  download: faDownload,
  'square-phone': faSquarePhone,
  linkedin: faLinkedin,
  github: faGithub,
  gitlab: faGitlab,
};

function renderIcon(name, opts) {
  const iconDef = icons[name];
  if (!iconDef) return '';
  const options = {};
  if (opts && opts.classes) options.classes = opts.classes;
  if (opts && opts.title) options.title = opts.title;
  const result = icon(iconDef, options);
  return result ? result.html[0] : '';
}

module.exports = { renderIcon };
