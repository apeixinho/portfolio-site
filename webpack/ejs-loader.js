const ejs = require('ejs');
const { renderIcon } = require('./fontawesome');
const originalLoader = ejs.fileLoader;

function extractExprs(content) {
  const exprs = [];
  const re = /<%=\s*([^%]+?)\s*%>/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    exprs.push(m[1].trim());
  }
  return exprs;
}

function preprocessContent(content) {
  return content.replace(/<%=\s*([^%]+?)\s*%>/g, () => '<%- "__EJS_PH__" %>');
}

module.exports = function (source) {
  this.cacheable && this.cacheable();
  const filename = this.resourcePath.replace(/\\/g, '/');

  const allExprs = [];

  ejs.fileLoader = function (filePath) {
    let content = originalLoader.call(ejs, filePath);
    if (Buffer.isBuffer(content)) content = content.toString();
    if (typeof content === 'string') {
      const isMain = filePath.replace(/\\/g, '/') === filename;
      if (!isMain) {
        allExprs.push(...extractExprs(content));
      }
      content = preprocessContent(content);
    }
    return content;
  };

  allExprs.push(...extractExprs(source));
  const prepared = preprocessContent(source);

  let rendered;
  try {
    rendered = ejs.render(prepared, { icon: renderIcon }, { filename });
  } catch (e) {
    ejs.fileLoader = originalLoader;
    this.emitError(e);
    return 'module.exports = function() { return ""; }';
  }

  ejs.fileLoader = originalLoader;

  const parts = [];
  const chunks = rendered.split('__EJS_PH__');
  for (let i = 0; i < chunks.length; i++) {
    parts.push(JSON.stringify(chunks[i]));
    if (i < allExprs.length) {
      parts.push(allExprs[i]);
    }
  }

  return 'module.exports = function(templateParams) { with(templateParams) { return ' + parts.join(' + ') + '; } }';
};
