var URL = "https://api.giphy.com/v1/gifs/search";
// this should not be here :(
var Key = "zvX6mx15FdjrqCj5yVJQZx8Oox55oEca";
var buttonTriggered = "";
var limit = 10;
var parentalControl = 1;
var topic = ["dog", "cat", "bird"];


renderTopic();

function renderTopic() {
    // get rid of any old buttons
    $("#buttonGrid").empty();
    // build the buttons
    for (i = 0; i < topic.length; i++) {
        var d = $("<div>");
        d.addClass("col s12 center-align");
        var b = $("<button>");
        b.addClass("btn waves-effect blue-grey lighten-3 black-text buttonStretch hoverable");
        b.attr("data-name", topic[i]);
        b.text(topic[i]);
        // add the button to the div 
        $(d).append(b);
        // add the div to page
        $("#buttonGrid").append(d);
    }
}


$("#submit").on("click", function (event) {
    event.preventDefault();
    buttonTriggered = $("#newTopic").val().trim();
    console.log(buttonTriggered)
    addTopic();    
})


function addTopic() {
    topic.unshift(buttonTriggered);
    renderTopic();
}




$(document).on("click", "button", function (event) {
    event.preventDefault();
    var queryTerm = $(this).attr("data-name");
    var queryString = URL + "?q=" + queryTerm + "&api_key=" + Key + "&limit=" + limit;
    var queryURL = encodeURI(queryString);
    console.log(queryURL);
    getResults(queryURL);
    updateBreadCrumb(queryTerm);
})


function getResults(qurl) {
    $.ajax({
        url: qurl,
        method: "GET"
    }).then(function (response) {

        //prepare the grid

        $("#imageGrid").empty();
        
        var result = response; // console.log(response);   
        // for each item in data repsonse 
        for (i = 0; i < result.data.length; i++) {
            var rating = result.data[i].rating;
            var title = result.data[i].title;
            var stillURL = result.data[i].images.fixed_width_still.url
            var gifURL = result.data[i].images.fixed_width.url


            // begin making divs
            var colDiv = $("<div>");
            colDiv.addClass("col s12 m6 l3");

            var cardContainerDiv = $("<div>");
            cardContainerDiv.addClass("card cardContainer");

            var imageDiv = $("<div>");
            imageDiv.addClass("card-image cardImg img-responsive")

            var image = $("<img>")
            image.attr("data-still", stillURL);
            image.attr("data-gif", gifURL);
            image.attr("src", stillURL);
            image.attr("data-state", "still");

            var ratingSpan = $("<span>");
            ratingSpan.text("Rating: " + rating);
            ratingSpan.addClass("cardRating");

            var titleSpan = $("<span>");
            titleSpan.text(title);
            titleSpan.addClass("card-title");

            // // put it all together...           

            colDiv.append(cardContainerDiv);
            cardContainerDiv.append(imageDiv);
            imageDiv.append(image);
            imageDiv.append(ratingSpan);
            imageDiv.append(titleSpan);
            $("#imageGrid").append(colDiv)
        }
    })
}


function updateBreadCrumb (qt) {
    $("#searchTerm").text(qt);
}