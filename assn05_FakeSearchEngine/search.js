keywords = {
    kw: ['cloud', 'frameworks', 'pasta'],
}
userkw = [];
searchData = [];
rqst = 0; // Number of server request(ajax calls)

$("#btn-search").on("click", function(e){

    init();

    searchInput = $("#search").val();
    input = searchInput.split(' ');

    userkw = getKeyWords(input);
    
    if(userkw.length)
        collectData(userkw);
    else
        insultUser();

    e.preventDefault();
});

// Reset variables and page from a previous search (if any)
function init()
{
    $(".search-result").remove();
    $(".jumbotron").addClass("display-off");

    userkw = [];
    searchData = [];
    rqst = 0;
}

// Get keywords from user input string
function getKeyWords(userInput){

    tmp = [];

    for(var elem in userInput){

        current = userInput[elem];

        if(current == keywords.kw[0])
            tmp.push(current)
        else if(current == keywords.kw[1])
            tmp.push(current)
        else if(current == keywords.kw[2])
            tmp.push(current)
    }

    return tmp;
}

// Get the results(JSON objects) for all the keywords
// that the user had in their search input
function collectData(kws){

    for(var elem in kws){
        keywordFileName = kws[elem];
        fetchKeywordResults(keywordFileName+".json");
    }
}

// Gets a JSON file and inserts
// the returned objects to searchData list
function fetchKeywordResults(dataURL)
{
    $.getJSON(dataURL)
    .done(function(data){
        $.each(data, function(key){
            searchData.push(data[key]);
        });

        ++rqst;
        if(rqst == userkw.length) // Wait for all AJAX calls to complete
            displayResults(searchData);
    });
}

/*
 function crossRsults(d)
 {

    newd = []; // List with no duplicates
    resultsToRemove = [];

    console.log(d);
    $.each(d, function(key, val){

        var currObj = d[key];
        var tmp = d[0];
        d[0] = currObj;
        d[key] = tmp;

        for(var i=1; i<d.length; i++){
            // Combine duplicate results score
            if(d[0].title == d[i].title)
            {
                d[0].score = parseFloat(d[0].score) + parseFloat(d[i].score);
                resultsToRemove.push(i);
            }
        }
    });
    //for(var i in resultsToRemove)
        //d.splice(resultsToRemove[i], 1);

    return newd;
 }
 */
// Display the results from the JSON files
// in a nice way sorted by relevance score
function displayResults(d){

    // Combine duplicates, merge to one
    //newd = crossResults(d);

    d.sort(function(ri ,rj){
        return ri.score - rj.score;
    });
    
    for(var i in d){

        card = $("#results").clone();

        card.find("a").text(d[i].title).attr("href", d[i].url);
        card.find(".url").text(d[i].url);
        card.find(".url").next().text(d[i].score);
        card.find(".excerpt").text(d[i].excerpt);

        card.removeAttr("id");
        card.addClass("search-result");
        card.insertAfter("#results");

    }

}

// Insult the user if their search has no keywords
function insultUser()
{
    $(".jumbotron").removeClass("display-off");
}