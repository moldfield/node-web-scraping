var YQL = require("yql");
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


/*new YQL.exec('select * from data.html.cssselect where url="http://www.yahoo.com" and css="h1"', function(response) {
    
    //response consists of JSON that you can parse
    console.log(response.query.results.results.h1.class);
});*/
var index = ['SPY','MSFT','GOOG','DOW','AAPL'];
var url = 'http://finance.yahoo.com/q/op?s=' + index[0];
var yahooURL = 'http://www.yahoo.com';
var dataSelectboxLinks = [];

// First get the URL of the index and gather options from here
request(url, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);

    $('option').each(function(i, element){
      var dataSelectboxLink = $(this).attr('data-selectbox-link');
      // Now go to the page of each option
      dataURL = yahooURL + dataSelectboxLink;
      console.log(dataURL);
    });
  } // endif
}); // end initial url request

request(dataURL , function (error, response, html) {

    if (!error && response.statusCode ==200) {
        var $$ = cheerio.load(html);
        console.log('\n Success of second loop\n');
    } else { 
        //console.log(response);
    }
}); // end dataURL request



/*(var rank = a.parent().parent().text();
      var title = a.text();
      var url = a.attr('href');
      var subtext = a.parent().parent().next().children('.subtext').children();
      var points = $(subtext).eq(0).text();
      var username = $(subtext).eq(1).text();
      var comments = $(subtext).eq(2).text();
      // Our parsed meta data object
      var metadata = {
        rank: parseInt(rank),
        title: title,
        url: url,
        points: parseInt(points),
        username: username,
        comments: parseInt(comments)
      };
      //console.log(metadata);

        fs.appendFile('output.json', JSON.stringify(metadata, null, 4), function(err){

            //console.log('File successfully written! - Check your project directory for the output.json file');

        })*/