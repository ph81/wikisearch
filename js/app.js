$(document).ready(function() {
  

  /* when form is submitted */
  $(".form").submit(function(){
    $("#results").html(" "); // set innerHtml of results div as blank
  });

  /* when search button is clicked */
  $("#search").click(function(){
    $("#results").html(" ");
    searchWiki();
  });

  
  function searchWiki(){
    var q = $("#query").val();
    //alert(q);
    //var url = "https://en.wikipedia.org/w/api.php?action=query&format=jsonp&list=search&srsearch=" + q + "&callback=?"
    var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+q+"&callback=?";
    //calling api

    $.ajax({
      url:url,
      type: "GET",
      dataType: "jsonp",
      success: function(result){
        var data = result.query.pages;
        console.log("1");
        render(data);
      },
      error: function(err){
        console.log(err);
        alert("Oops something went wrong! Please try again.");
      }
    });

    
  }
  
  /* render function to append the search result pages */
  function render(data){
    var pageurl="http://en.wikipedia.org/?curid=";
    for(var i in data){
      $('#results').append("<div id='articles'><a target='_blank' href='"+pageurl+data[i].pageid+"'><h3>"+data[i].title+"</h3><p>"+data[i].extract+"</p></a></div>");
    }
  }

  //random article
  $("#random").on("click", function( ) {
      window.open("https://en.wikipedia.org/wiki/Special:Random");
  });


});
