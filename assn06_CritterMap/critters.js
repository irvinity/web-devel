
var imgs = { 
  0 : "http://animalcontrolphx.com/wp-content/uploads/2013/05/gophers-400.jpg",
  1 : "https://kids.nationalgeographic.com/content/dam/kids/photos/animals/Mammals/Q-Z/wolverine-crouching.adapt.945.1.jpg",
  2 : "https://www.waikikiaquarium.org/wp-content/uploads/2013/11/octopus_620.jpg"
}

$("#choice").on("change", function(){

  critterChoice = $( "select#choice option:checked" ).val();

    $.getJSON("data"+critterChoice+".js")
    .done(function(data){
    
      $(".old-critters").remove();

      // Spawn all critters using data
      for(var i in data){

        pos = data[i]; // Coordinates for new critter

        newCritter = $("#critter").clone();
        newCritter.attr("src", imgs[critterChoice])
        
        newCritter.css({
          "left": pos[0],
          "top": pos[1],
        })

        newCritter.removeAttr("id");
        newCritter.addClass("old-critters").removeClass("hide");
        newCritter.insertAfter("#critter");
      }
    })

});
