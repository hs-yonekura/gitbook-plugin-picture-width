const cheerio = require('cheerio');

module.exports = {
  hooks: {
    'page': function(page) {
      const $ = cheerio.load(page.content);
      $('table').each(function(i, table){
        if (/^{[\s\d\|(px)(em)(pt)%]+}$/g.test($(table).prev().text()))
        {
          var widths = $(table).prev().text().match(/[\d(px)(em)(pt)%]+/g);
          $(table).find('th').each(function(i, th){
            if (i < widths.length)
              $(th).attr('width', widths[i]);
          });
          $(table).prev().remove();
        }
      });
      page.content = $.html();
      return page;
    }
  }

}
