// Irving Alvarez

var last_comment_id = 0;

// Make a request to get all the blog comments on initial page load
$(window).load(function(){

    // This handler requests all blog comments
    $.ajax({
        url: BASEURL + "/poll_all_blog_comments"
    })
    .done(function(data){

        if(data['blog_comments_found'] == true){

            // Parse the returned JSON string to a js object
            temp = JSON.parse(data['comments']);
            blogComments = temp.Comments;

            for(var i = 0; i < blogComments.length; i++)
                insert_comment_in_page(blogComments[i]);
        
            last_comment_id = blogComments[i-1].Id;
        }
        poll_new_comments();
    });

});

// Make a request every 3 seconds to poll new comments
function poll_new_comments(){

    console.log("Last ID:", last_comment_id)
    // This handler requests new comments after most recent comment
    $.ajax({
        url: BASEURL + "/poll_new_blog_comments/" + last_comment_id
    })
    .done(function(data){
        // Parse the returned JSON string to a js object
        temp = JSON.parse(data);
        blogComments = temp.Comments; // list of js objects
        console.log(blogComments.length)
        if(blogComments.length > 0){

            for(var i = 0; i < blogComments.length; i++)
                insert_comment_in_page(blogComments[i]);
        
            last_comment_id = blogComments[i-1].Id;
        }
    })

    setTimeout(poll_new_comments, 3000);
}

// Clones some html markup and fills it up with 
// the content with the the new comment data
function insert_comment_in_page(comment)
{
    // Get a html clone for a new comment card
    cmtSkeleton = $(".sample-card").clone();

    // Insert the content for the new comment
    cmtSkeleton.find(".comment-username").text(comment["User.Username"]);
    cmtSkeleton.find(".comment-body").text(comment.Body);
    cmtSkeleton.find(".comment-date").text(comment.CreateTime);

    // Remove display-none
    cmtSkeleton.removeClass("sample-card d-none");

    // Insert the new comment to the page
    cmtSkeleton.insertAfter(".post-card");
}

// New comment request
$('#submit-comment-btn').on("click", function(event){

    // Get the user id and comment body
    userId = $("userid").text();
    comment = $("#user-comment").val();

    // Validate user comment is not empty
    if(!comment){
        err = 'Cannot post an empty comment';
        $("#comment-error").removeClass("d-none").text(err);
        event.preventDefault();
        return;
    }else{

        // Make an AJAX call to a post the new comment
        $.ajax({
            method: "POST",
            url: BASEURL + "/post_comment",
            data: {user_id: userId, user_post: comment}
        });
        $("#user-comment").val("");
        $("#comment-error").addClass("d-none");
    }

    event.preventDefault();
});

// Submits the login form username & password fields to a backend handler
// that validates those credentials. If response is valid, display
// the user page; else display proper error.
$("#login").on("click", function(e){

    // Get the login input elements reference
    username = $("#usernameFormField");
    password = $("#passwordFormField");
    errorMsg = $("#errMsg");

    // Username and password field are empty
    if(username.val() == "" && password.val() == ""){
        errorMsg.text("Enter your username and password!");
        errorMsg.removeClass("d-none");
    }
    else{
        // Send the username & password to a backend handler
        $.ajax({
            method: "POST",
            url: BASEURL + "/validate_user",
            data: { username: username.val(), password: password.val() } // The values the user entered
        })
        .done(function(data){
            // The username entered does not exist in db
            if(data['username'] == false){
                errorMsg.text("Invalid username");
                errorMsg.removeClass("d-none");
            }
            // The password for the username entered is wrong
            else if(data['password'] == false){
                errorMsg.text("Invalid password");
                errorMsg.removeClass("d-none");       
            }
            // The username and password entered are correct
            else if(data['username'] == true && data['password'] == true){
                // Hide the login form (& error message), clear the inputs, and show the user home page
                $("#login-header, #login-form, #errMsg").addClass("d-none");
                username.val("");
                password.val("");
                $("#comment-form").removeClass("d-none");
                $("#login-form").addClass("d-none");
                $("#user-card").removeClass("d-none").addClass("d-flex");
                $("#user-card").find("#username").text(data['username_val']);
                $("userid").text(data['username_id']);
            } 
        })
    }
    e.preventDefault();
});

// Logout hides the comment form and displays the login form
$("#logout").on("click", function(){
    $("#comment-form").addClass("d-none");
    $("#login-form").removeClass("d-none");
    $("#user-card").removeClass("d-flex").addClass("d-none");
    $("#user-card").find("#username").text("");
});
