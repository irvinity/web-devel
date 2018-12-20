
// Input error flags
e1 = true;
e2 = true;

// Individual comment id
cardID = 1;

$(window).on("load", function(){
    $("#user-name").val("");
    $("#user-comment").val("");
});

// New comment request
$('.btn-primary').on("click", function(event){

    name = $("#user-name").val();
    comment = $("#user-comment").val();

    // Validate input, display errors if any
    token = checkPoint(name, comment, event);
    if(!token){
        event.preventDefault();
        return;    
    }

    // Get skeleton html for a comment post
    commentCardSkeleton = $(".sample-card").clone();
    console.log(commentCardSkeleton);

    // Mark comment with unique id
    commentCardSkeleton.attr("id", "comment-" + cardID);
    commentCardSkeleton.find("button").attr("id", cardID);
    ++cardID;

    // Insert the content
    commentCardSkeleton.find("h4.comment-owner").text(name);
    commentCardSkeleton.find("p.comment").text(comment);
    commentCardSkeleton.find("div.comment-date").text(moment().format("MMM Do YYYY, h:mm a"));

    commentCardSkeleton.removeClass("sample-card d-none");

    // Insert into the page
    commentCardSkeleton.insertAfter(".post-card");

    // Reset form
    $("#user-name").val("");
    $("#user-comment").val("");
    e1 = true; e2 = true;

    // Prevent page reload
    event.preventDefault();
});

// Returns tk=1 if there are no input errors, otherwise tk=0
function checkPoint(name, comment, event){
    
    tk = 1; // token

    if(!name){
        tk = 0;
        err = 'Name cannot be empty';
        $("#name-error").removeClass("d-none").text(err);
    }
    if(!comment){
        tk = 0;
        err = 'Comment cannot be empty';
        $("#comment-error").removeClass("d-none").text(err);
    }
    if(e1 || e2)
        tk = 0;
    
    return tk;
}

// Display or hide input error for user name
// when form field loses focus
$("input[id=user-name]").focusout(function(){

    n = $(this).val();

    patt = new RegExp("[^a-zA-Z0-9]+");

    // Check name
    if(patt.test(n)){
        err = 'Invalid name (only letters and numbers, no spaces)';
        $("#name-error").removeClass("d-none").text(err);
        e1 = true;
    }else if(!n){
        err = 'Name cannot be empty';
        $("#name-error").removeClass("d-none").text(err);
        e1 = true;
    }
    else{
        $("#name-error").addClass("d-none");
        e1 = false;
    }
});

// Display or hide input error for user comment
// when form field loses focus
$("textarea[id=user-comment]").focusout(function(){

    c = $(this).val();

    // Check comment
    if(!c){
        err = 'Comment cannot be empty';
        $("#comment-error").removeClass("d-none").text(err);
        e2 = true;
    }else{
        $("#comment-error").addClass("d-none");
        e2 = false;
    }

});

// Deletes a user comment
$(document).on("click", ".delete_btn", function(){

    _cardID = $(this).attr("id");
    //console.log(_cardID);
    $("#comment-"+_cardID).remove();
    
});