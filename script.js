//app generates random quotes

//forismatic api gets a random quote and it's corresponsding author in jsonp
$(document).ready(function () {

  $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?").done(update);

});

function update(data) {
  console.log(data.quoteAuthor);
  $("#text").append( "<p>" + data.quoteText + "</p>" );

  let author = data.quoteAuthor;
  if(author == ""){
    author = "Anonymous";  
  }
  $("#author").append( "<p>" + author + "</p>" );
};