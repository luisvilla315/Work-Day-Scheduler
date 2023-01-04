
var timeTracker = function() {
    //get current hour from moment.js
    var currentHour = moment().format("H");
    // var currentHour = moment().hour();
    console.log(currentHour)
 // adding time-block funtion to select the time for past, present, future 
   $(".time-block").each(function() {
        var blockTime = $(this).attr("id");

        console.log(typeof blockTime);


        if (Number(blockTime) < Number(currentHour)) {
            $(this).removeClass("future");
            $(this).removeClass("present");
            $(this).addClass("past");
        }
        else if (blockTime === currentHour) {
            $(this).removeClass("past");
            $(this).removeClass("future");
            $(this).addClass("present");
        }
        else {
            $(this).removeClass("present");
            $(this).removeClass("past");
            $(this).addClass("future");
        }
   })
}
var todayDate = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").html(todayDate);

// Set local storrage //
    $("#8 .description").val(localStorage.getItem("8"));
    $("#9 .description").val(localStorage.getItem("9"));
    $("#10 .description").val(localStorage.getItem("10"));
    $("#11 .description").val(localStorage.getItem("11"));
    $("#12 .description").val(localStorage.getItem("12"));
    $("#13 .description").val(localStorage.getItem("13"));
    $("#14 .description").val(localStorage.getItem("14"));
    $("#15 .description").val(localStorage.getItem("15"));
    $("#16 .description").val(localStorage.getItem("16"));
    $("#17 .description").val(localStorage.getItem("17"));

    //Button to the save the changes on the localstoage.
    var saveContent = function() {
        $(".saveBtn").on("click", function(){
            
            var time = $(this).parent().attr("id");
            var content = $(this).siblings(".description").val();
            localStorage.setItem(time, content);
    
        })
    }


timeTracker();
saveContent();

