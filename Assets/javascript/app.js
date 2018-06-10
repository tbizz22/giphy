var URL = "https://api.giphy.com/v1/gifs/search";
// this should not be here :(
var Key = "zvX6mx15FdjrqCj5yVJQZx8Oox55oEca";
var buttonTriggered = "";
var limit = 20;
var parentalControl = 1;
var topic = [];

// getTopic();


function storeTopic() {
    // localStorage.clear();
    localStorage.setItem("topic", JSON.stringify(topic));
}

function getTopic() {
    if (localStorage.getItem("topic") != null) {
        topic = JSON.parse(localStorage.getItem("topic"));
        return topic;
    } 
}

getTopic();
renderTopic();


function renderTopic() {
    // get rid of any old buttons
//    getTopic();

    $("#buttonGrid").empty();
    // build the buttons
    if (topic === null) {
       return false;
    } else {
        for (i = 0; i < topic.length; i++) {
            var d = $("<div>");
            d.addClass("col s12 center-align");
            var b = $("<button>");
            b.addClass("btn waves-effect blue-grey lighten-3 black-text buttonStretch hoverable topicButton");
            b.attr("data-name", topic[i]);
            b.text(topic[i]);
            // add the button to the div 
            $(d).append(b);
            // add the div to page
            $("#buttonGrid").append(d);
        }
        storeTopic();
    }
}


// add topic button

$("#submit").on("click", function (event) {
    event.preventDefault();
    buttonTriggered = $("#newTopic").val().trim();
    
    if (buttonTriggered.length < 3) {

        // var d = $("#input-field");
        var msg = "Please enter at least 3 characters"
        alert(msg);
        // var s = $("<span>")
        // s.text = msg
        // s.attr("class","helper-text")

        // s.append(d)      

    } else {
        console.log(buttonTriggered)
        addTopic();
        clearInput();
    }
})


function addTopic() {
    topic.unshift(buttonTriggered);
    renderTopic();
}



// user clicks a button 


$(document).on("click", ".topicButton", function (event) {
    event.preventDefault();
    var queryTerm = $(this).attr("data-name");
    var queryString = URL + "?q=" + queryTerm + "&api_key=" + Key + "&limit=" + limit;
    var queryURL = encodeURI(queryString);
    console.log(queryURL);
    getResults(queryURL);
    updateBreadCrumb(queryTerm);
    hideEmpty();
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
            var stillURL = result.data[i].images.fixed_height_still.url
            var gifURL = result.data[i].images.fixed_height.url


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




// Animate gif on click
$(document).on("click", "img", function (event) {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-gif"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


function clearInput() {
    $('#newTopic').val('');
    $("#topicLabel").removeClass("active");
}


// hide empty state grid
function hideEmpty() {
    $("#emptyState").addClass("hide");
    $("#rightViewport").removeClass("hide");
}