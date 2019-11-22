module.exports = {
  hooks: {
    'page': function(page) {
      page.content = page.content.replace(/\{\s*([\d\%(em)(pt)(px)]+)\s*\}(<img.*?)>/gim, '$2 width=\"$1\">');
      return page;
    }
  }
}
