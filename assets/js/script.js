$(init); // Calls function at load of page / init used from jQuery

function init() { 
  //Displays date in header
  var today = dayjs()
  $("#currentDay").text(moment().format("dddd, MMMM Do"));

  //Checks time block every minute (changes color as hour changes)
  colorTimeBlocks();
  setInterval(colorTimeBlocks, 60000);

  //Retrieves date & time from local storages
  $(".time-block").each(function() {
   var blockId = $(this).attr("id");
   $("#" + blockId + " textarea").text(localStorage.getItem(moment().format("DDDYYYY") + blockId));
  });
  
  // Adds an event listener when the save button is clicked.  Calls save function
  $(".saveBtn").on("click", save);
}

// This function updates the color of each time block based on the current time
function colorTimeBlocks() {

  $(".time-block").each(function() {
   var actualTime = parseInt(moment().format("H"));
   var listedTimeBlock = parseInt($(this).attr("id").replace("hour-", ""));

   //Removes current class (color of block to "reset" based on actual time)
   $(this).removeClass("past present future");

   //Compares actual time to time block and sets color based on preset past present or future starter CSS code
   if (listedTimeBlock < actualTime) {
     $(this).addClass("past");
   } else if (listedTimeBlock > actualTime) {
     $(this).addClass("future");
   } else {
     $(this).addClass("present");
   }
  });
}

// This function saves the user input from the text area to localStorage when save button is clicked
function save(event) {
  var actualHour = $(this).parent().attr("id");

  localStorage.setItem(moment().format("DDDYYYY") + actualHour, $("#" + actualHour + " textarea").val());
}