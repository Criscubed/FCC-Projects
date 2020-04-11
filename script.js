//app generates random quotes

//forismatic api gets a random quote and it's corresponsding author in jsonp
$(document).ready(function () {
  //on document start, get a quote and render it
  $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?").done(update);
  
  //add an onclick event to a button to get a new quote
  $("#refreshButton").click(function(){
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?").done(update);
  });

  $('#tweetQuoteButton').click(function(){
    window.open(tweetURL);
  });
});

//a url that directs the user to tweet about the current quote.
var tweetURL = "";

//takes in data which is an object that has properties "quoteText" and "quoteAuthor"
//if no "quoteAuthor" is given, then author is set to anonymous
//both properties are appended to the html file
function update(data) {
  console.log(data.quoteAuthor);
  $("#text").text( data.quoteText );

  let author = data.quoteAuthor;
  if(author == ""){
    author = "Anonymous";  
  }
  $("#author").text( author );

  buildTweetURL(data.quoteText, author);
};

function buildTweetURL(quote, author) {
  tweetURL = "https://twitter.com/intent/tweet?text=" + quote + ' - ' + author;
}