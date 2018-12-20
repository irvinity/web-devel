// Irving Alvarez

/* Sol. problem 1 */
document.getElementById("wishes").innerHTML = "I hate you, Bob.";

/* Sol. problem 2 */
imgSrc = "https://i.ytimg.com/vi/oMQI0bJJOvM/hqdefault.jpg";
$("#duckling").attr("src", imgSrc);

/* Sol. problem 3 */
$('.furry-mammals').find("img").css("width", "300px");

/* Sol. problem 4 */
tranform = 0;
$('#red-trigger').click(function(){

    if(!tranform){
        fontSize = $(this).parent().css("fontSize");
        //console.log(fontSize);
        $(this).parent().css({
            "color": "red",
            "font-size": parseInt(fontSize, 10) * 2,
        });
        tranform = 1;
    }
});

/* Sol. problem 5 */
$('#hidden-cipher').find("img").on('click', function(){
    $(this).next().removeClass("hidden");
});

/* Sol. problem 6 */
$('.menu').mouseover(function(){
    $(this).css('border', '5px solid yellow');        
}).mouseout(function(){
    $(this).css('border', 'none');        
});

/* Sol. problem 7 */
$("#input-text").keyup(function(){
    //console.log("Input has focus");
    $(this).next().val($(this).val());
});

/* Sol. problem 8 */
$("#rebel-input").focusout(function(){
    //console.log("Input lost focus");
    if($(this).val().length > 0)
        $(this).val("HAHA!");
});

/* Sol. problem 9 */
checkbox = $("#selectbox-enabler");
checkbox.next().prop("disabled", true);
//checkbox.next().addClass("hidden");

checkbox.on('click', function(){
    if(checkbox.prop("checked"))
        $(this).next().prop("disabled", false); //$(this).next().removeClass("hidden");
    else
        $(this).next().prop("disabled", true); //$(this).next().addClass("hidden");
});

/* Sol. problem 10 */
$("#date").focusout(function(){
    console.log($(this).val());
    //console.log(moment($(this).val()).format("MM/DD/YYYY"));
    date = moment($(this).val()).format("MM/DD/YYYY");
    $(this).val(date);
});
