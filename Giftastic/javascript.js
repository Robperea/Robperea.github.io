$(document).ready(function(){

    var athletes = ["Michael Jordan", "Kobe Bryant", "Serena Williams", "Leo Messi", "Simone Biles", "Michael Phelps", "Patrick Mahomes", "Saquon Barkley", "Aaron Donald", "Aaron Judge"];

    function displayAthleteInfo(athlete) {
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        athlete + "&api_key=QvA5gAG4ModNZNDgwLMkDuvtTJqeU1y4&limit=10";
    
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        
        .then(function(response) {

            var results = response.data;
            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.append(p);
                gifDiv.append(personImage);

                $("#gif-display").prepend(gifDiv);
        
        }
    });
};

    function createButtons() {
        $("#button-display").empty();
        for (var i = 0; i < athletes.length; i++) {
            var b = $("<button>");
            b.addClass("athlete-btn");
            b.attr("data-person", athletes[i]);
            b.text(athletes[i]);
            $("#button-display").append(b);
        }
    }
    createButtons();

    $("#athlete-search").on("click", function (event) {
        event.preventDefault();
        var athlete = $("#athlete-input").val().trim();
        athletes.push(athlete);
        createButtons();
    })
    $(document).on("click",".athlete-btn", function() {
        var athlete = $(this).attr("data-person");
        console.log(athlete)
        displayAthleteInfo(athlete);
    });

    function playGif() { 

    var state = $(this).attr('data-state');

    if (state == 'still'){
         $(this).attr('src', $(this).data('animate'));
         $(this).attr('data-state', 'animate');
    } else{
         $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

    }
})