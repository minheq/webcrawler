var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  //All the web scraping magic will happen here
  
  listing = 'http://www.renotalk.com/directory-listing/category/2/Interior-Design-Contractors';
  
  request(listing, function(error, response, html){
    if(!error) { 
      var $ = cheerio.load(html);
      $('.listing-wrapper message_box').filter(function(){
        var data = $(this);
        var list = data.children();
        console.log(list);
      }
    }
  }

  /*
  request(url, function(error, response, html){

    if(!error) { 
      var $ = cheerio.load(html);
      //initialize what is being scraped
      var web, companyName, phone, address, email;
      var json = {
        companyName: "",
        web: "",
        phone: "",
        address: "",
        email: ""
      };
      
      //extracting data from the DOM 
      $('.merchant-contact-web').filter(function(){
        var data = $(this);

        web = data.children().first().text();
        json.web = web;
        console.log(web);
      })

      $('.merchant-contact-phone').filter(function(){
        var data = $(this);
        json.phone = data.text();
      })

      $('.merchant-contact-address').filter(function(){
        var data = $(this);
        json.address = data.text();
      })

      companyName = $("input[name='list_name']").val();
      json.companyName = companyName;
      email = $("input[name='email_id']").val();
      json.email = email;

      console.log(companyName);
      console.log(email);

    } else {
      console.log(error);
    }

    //save the json to a file
    fs.writeFile('renotalk.json', JSON.stringify(json, null, 4), function(err){
    console.log('File successfully written! - Check your project directory for the renotalk.json file'); */
  })

  //send response
  res.send('Check your console!');
  })

  
})


app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;