var URL ="https://api.giphy.com/v1/gifs/search";
// this should not be here :(
var Key ="zvX6mx15FdjrqCj5yVJQZx8Oox55oEca";
var buttonTriggered ="";
var limit = 10
var topic = ["dog","cat","bird"];


renderTopic();

function renderTopic () {
    // get rid of any old buttons
    $("#buttonGrid").empty();
    // build the buttons
    for (i=0; i < topic.length; i++) {
        var d = $("<div>");
        d.addClass("col s12 center-align");
        var b = $("<button>");
        b.addClass("btn waves-effect blue-grey lighten-3 black-text buttonStretch");
        b.attr("data-name",topic[i]);
        b.text(topic[i]);
        // add the button to the div 
        $(d).append(b);
        // add the div to page
        $("#buttonGrid").append(d);
    }
}


$("#addIcon").on("click", function(event) {
    event.preventDefault();
    buttonTriggered = $("#icon_prefix").val().trim();
    console.log(buttonTriggered)
    addTopic();
})


function addTopic () {
    topic.unshift(buttonTriggered);
    renderTopic();
}




$(document).on("click", "button", function(event) {
    event.preventDefault();
    var queryTerm = $(this).attr("data-name");
    var queryString = URL + "?q=" + queryTerm + "&api_key=" + Key + "&limit=" + limit;
    var queryURL = encodeURI(queryString);
    console.log(queryURL);
    getResults(queryURL);
})


function getResults(qurl) {
    $.ajax ({
        url: qurl,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })
}