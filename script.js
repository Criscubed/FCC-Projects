//app generates random quotes

//forismatic api gets a random quote and it's corresponsding author in jsonp
$(document).ready(function () {
  //on document start, get a quote and render it
  $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?").done(update);
  
  //add an onclick event to a button to get a new quote
  $("#new-quote").click(function(){
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?").done(update);
  });

});


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

  let tweetURL = "https://twitter.com/intent/tweet?text=" + data.quoteText + ' - ' + author;

  $("#tweet-quote").attr("href", tweetURL);
};
