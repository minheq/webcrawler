var express = require('express');
var fs = require('fs');
var request = require('request');
var http = require('http');
var cheerio = require('cheerio');
var app     = express();


app.get('/scrape', function(req, res){

    //First page to enter with the list
    var arr = [];
    arr.push('http://localhost:8080/en/node/352/22.html');
    arr.push('http://localhost:8080/en/node/352/222679.html?page=1');
    arr.push('http://localhost:8080/en/node/352/224658.html?page=2');
    arr.push('http://localhost:8080/en/node/352/229ba9.html?page=3');
    arr.push('http://localhost:8080/en/node/352/22fdb0.html?page=4');
    arr.push('http://localhost:8080/en/node/352/22af4d.html?page=5');

    for(var i = 0, limit = arr.length; i < limit; i++) {
    //send HTTP request to the server to receive HTML
      request(arr[i], function(error, response, html){

          if(!error){
              //load HTML with cheerio for selector query
              var $ = cheerio.load(html);
              

              //grab the URL from the list
              $('.view-field-node_title').filter(function(){
                  var data = $(this);
                  // console.log('http://localhost:8080/en/node' + data.children().children()[1].attribs.href.substring(13));
                  var innerURL = 'http://localhost:8080/en/node' + data.children().children()[1].attribs.href.substring(13);
                  

                  request(innerURL, function(error2, response2, html2){
                    $ = cheerio.load(html2);
                    
                    $('h1.title').filter(function(){
                      data = $(this);
                      // console.log(data[0].children[0].data);
                    });

                    $('p.paleGreen').filter(function(){
                      data = $(this);
                      console.log(data[0].children[0]);
                    });

                  });
              })
          }
      })  
    }
    
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;