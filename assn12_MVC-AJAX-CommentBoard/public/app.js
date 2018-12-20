$("#login").on("click", function(e){

    // Get the login input elements reference
    username = $("#exampleInputEmail1");
    password = $("#exampleInputPassword1");
    errorMsg = $("#err-msg");

    // Username and password field are empty
    if(username.val() == "" && password.val() == ""){
        errorMsg.text("Enter your username and password!");
        errorMsg.removeClass("d-none");
    }
    else{
        // Send the username & password to a backend handler
        $.ajax({
            method: "POST",
            url: baseurl + "/login",
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
                $("#login-header, #login-form, #err-msg").addClass("d-none");
                username.val("");
                password.val("");
                $("#profile-home").removeClass("d-none");
                $("#profile-home").find("#username").text(data['username_val']);
                $("#profile-home").find("#password").text(data['password_hash']);
            } 
        })
    }
    e.preventDefault();
})
$("#logout").on("click", function(e){
    // Hide the home page and display the login form
    $("#profile-home").addClass("d-none");
    $("#login-header, #login-form").removeClass("d-none");

    e.preventDefault();
})