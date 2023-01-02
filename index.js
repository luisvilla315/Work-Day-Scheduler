var currentDay = $("#currentDay");
var timeBlocks = $(".time-block");
var scheduleArea = $(".schedule");

var listItems = [];

var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

//sets up an array of objects if we dont have any saved listItems//
function startSchedule(){

//function that loops through each time block//
  timeBlocks.each(function(){
    var thisBlock = $(this);
    var thisBlockHr = parseInt(thisBlock.attr("data-hour"));

    var todoObj = {
      hour: thisBlockHr,
      text: "",
    }
     //adds object to listItems array//
    listItems.push(todoObj);
  });

   //stringify the array of objects then save it to local storage//
  localStorage.setItem("todos", JSON.stringify(listItems));
}

//add color to time blocks according to current time//
function setTimeBlocks(){
    timeBlocks.each(function(){
      var thisBlock = $(this);
      var thisBlockHr = parseInt(thisBlock.attr("data-hour"));

      if (thisBlockHr == currentHour) {
        thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        thisBlock.addClass("future").removeClass("past present");
      }
    });
}

function loadSavedSchedule(){
  
  listItems = localStorage.getItem("todos");
  listItems = JSON.parse(listItems);

  //loop through the array and assign the text to the timeBlocks//
  for (var i = 0; i < listItems.length; i++){
    var itemHour = listItems[i].hour;
    var itemText = listItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(listItems);
}

function saveHandler(){

  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

  //check which items need to be updated//
  for (var a = 0; a < listItems.length; a++){
    if (listItems[a].hour == hourToUpdate){
      //set the text to what was entered in textarea//
      listItems[a].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(listItems));
  renderSchedule();
}

// function that executes all other functions when document is loaded//
$(document).ready(function(){

  //set up time block colors//
  setTimeBlocks();
  //if there's nothing for the todos in local storage//
  if(!localStorage.getItem("todos")){
     //initialize the array of objects//
    startSchedule();
  } 

  //display current date//
  currentDay.text(currentDate);

   //load schedule saved in local storage//
  loadSavedSchedule();
  //run savehandler on save button click//
  scheduleArea.on("click", "button", saveHandler);
  
});