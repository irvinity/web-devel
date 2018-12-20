/* UPDATE RECIPE NAME */
$("recipename").on("click", function(){
    
    box = $("<input>").attr({"type": "textbox", "id": "box"}).val($(this).text());

    $(this).text("");
    $(this).append(box)
    box.select();

    // Update recipe name
    box.on('blur', function(){

        baseurl = box.parent().attr("path");
        pid = box.parent().attr("id");

        $.ajax({
            method: "POST",
            url: baseurl + "/handlers/edit_recipe/" + pid + "/" + $(this).val(),
            dataType: "text"
        })
        .done(function(){
            $("recipename").text($("#box").val());
            $("#box").remove();
        })
    });
});

/* UPDATE RECIPE DESC */
$(".recipe-desc").on("click", updateDescription)

function updateDescription(){

    // Recipe step identifiers
    recipeId = $(this).closest("tbody").attr("data-id");
    stepNumber = $(this).prev().text();

    // Input box
    editStepDescBox = $("<textarea>").attr({"id": "step-box"}).val($(this).text()).css("width", "100%");

    $(this).text("");
    $(this).append(editStepDescBox);
    editStepDescBox.select();

    // Update recipe description
    editStepDescBox.on("blur", function(){

        baseurl = $(this).closest("tbody").attr("path");

        $.ajax({
            method: "POST",
            url: baseurl + "/handlers/edit_recipe_step/" + recipeId + "/" + stepNumber+ "/" + $(this).val(),
            dataType: "text"
        })
        .done(function(){
            //console.log("Success: updated");
            $("#step-box").parent().text($("#step-box").val());
            $("#step-box").remove();
        })
        .fail(function(){
            console.log("Err: could not update description");
        })
    });
};

/* ADD RECIPE */
$("#add-recipe").on("click", function(){

    // Just some style
    $(this).removeClass("btn-warning").addClass("btn-light");

    $(this).prop("disabled", true);

    // Useful variables
    stepsList = $(".steps");
    recipeId = stepsList.attr("data-id");
    baseurl = stepsList.attr("path");

    // Declare input text box for new recipe
    stepDescBox = $("<textarea id='new-desc'>").css("width", "100%");

    // Ugly way to get count of recipes
    /* Note: optimize later */
    recipeStepsCount = $(".recipe-step").clone().length;
    newRecipeStepNum = recipeStepsCount + 1;

    // Clone a single table row(last recipe step)
    // The new step element
    newRecipe = $(".recipe-step"+"-"+recipeStepsCount).clone();

    // Set new id
    newRecipe.attr("class", "recipe-step recipe-step"+"-"+newRecipeStepNum);

    // Clear clone txt & append input box
    newRecipe.find("th").text(newRecipeStepNum);
    newRecipe.find("td").text("").append(stepDescBox);

    // Append new step for user input
    newRecipe.appendTo(stepsList);

    // Add new recipe step to db
    stepDescBox.on("blur", function(){

        $.ajax({
            method: "POST",
            url: baseurl + "/handlers/add_step/" 
            + recipeId + "/" 
            + newRecipeStepNum + "/" 
            + $(this).val(),
            dataType: "text"
        })
        .done(function(){
            newRecipe.find("td").text($("#new-desc").val());
            newRecipe.find("td").bind("click", updateDescription);
            $("#new-desc").remove();
            $("#add-recipe").removeClass("btn-light").addClass("btn-warning").prop("disabled", false);
        })
        .fail(function(){
            console.log("Err: cannot add");
        })
    });
  
    
});

/* DRAG AND DROP STEPS */
$(".steps").sortable({
    
    sort: function( event, ui ){
        var wdgt = ui['item'];
        wdgt[0].style.backgroundColor = "lightcoral";
    },
    stop: function( event, item ) {

        baseurl = $(".steps").attr("path");
        recipeId = $(".steps").attr("data-id");
        route = baseurl + "/handlers/update_steps/" + recipeId;

        // The element dragged
        ITEM = item['item'][0];
        // List data
        list = ITEM.parentElement;
        listCount = list.childElementCount;

        // Store all the list items new order
        datum = {};
        for(i = 0; i<listCount; i++)
            datum[i] = list.children[i].children[1].textContent;
        
        datumStr = JSON.stringify(datum);
    
        $.ajax({
            method: "POST",
            url: route,
            data: { steps: datumStr },
            dataType: "text"
        })
        .done(function(){
            console.log("Success: updated steps");
            for(var i=0; i<listCount; i++)
                list.children[i].children[0].textContent = i+1;
            
            ITEM.style.backgroundColor = "white";
        })
        .fail(function(){
            console.log("Err: cannot update steps");
        });
        
    }
});

// Just some styles
$(".recipe-step > th").css({
    "borderLeft": "5px solid lightcoral",
})