module.exports = {
  hooks: {
    'page': function(page) {
      var content = page.content;
      var result = content.match(/\{\s*?([:\scrl\d\%(em)(pt)(px)]+)\s*\}(<img.*?)>/gmi);
      if(result !== null)
      {
        result.forEach(function(r){
          var val = r.replace(/<img.*?>/g, '').replace(/[\{\}]/g, '').replace(/\s*:\s*/g, ':').trim().split(':');
          var replaceText = r.replace(/{.*?}/, '');
          val.forEach(function(v){
            var bl = false;
            switch(v){
              case 'c':
                replaceText = '<div style="text-align:center">' + replaceText + '</div>';
                break;
              case 'r':
                replaceText = '<div style="text-align:right">' + replaceText + '</div>';
                break;
              case 'l':
                replaceText = '<div style="text-align:left">' + replaceText + '</div>';
                break;
              default:
                replaceText = replaceText.replace('<img', '<img width="' + v + '" ');
                break;
            }
          });
          content = content.replace(r, replaceText);
        });
      }
      page.content = content;
      return page;
    }
  }
}
