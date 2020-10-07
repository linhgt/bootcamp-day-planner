$(document).ready(function(){
    
    //array of times for reference
    var Times = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];
    var container = $("#planner");

    //Day object used to store the entry
    var currentDay = {
        "9h" : "",
        "10h" : "",
        "11h" : "",
        "12h" : "",
        "13h" : "",
        "14h" : "",
        "15h" : "",
        "16h" : "",
        "17h" : "",
    };


    //Print out the current date time
    $("#currentDay").text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));

    //Build the planner by iteraing through the array
    Times.forEach(function(time){
        buildBlock(time);
    })
    
    //Retrieve the data from local storage and update it
    if (!localStorage.getItem("currentDay"))
    {
        updatePlanner(currentDay);
    }
    else
    {
        updatePlanner(JSON.parse(localStorage.getItem("currentDay")));
    }

    //Bind eventlistener to each save button
    $(".btn").click(function(){
        entry = $(this).siblings("textarea").val();
        hour = $(this).siblings("div").text();
        //Save the hour and corresponding entry to local storage
        savePlan(hour, entry);
    });

    //Save the entry to the localstorage
    function savePlan(hour, entry)
    {
        //If no Day object presented in the storage
        //Create one
        if (!localStorage.getItem("currentDay"))
        {
            localStorage.setItem("currentDay", JSON.stringify(currentDay));
        }

        //Retrieve the day object from the storage
        //Update the object and put it to the storage
        var theDay = JSON.parse(localStorage.getItem("currentDay"));
        theDay[hour] = entry;

        localStorage.setItem("currentDay", JSON.stringify(theDay));
    }

    //Build a time block
    function buildBlock(time){
        //build the outer block
        var block = $("<div>");
        block.attr("id", time);
        block.attr("class", "row border-top border-bottom block");

        //Col for displaying time
        var timeCol = $("<div>");
        timeCol.addClass("col-md-1");
        timeCol.text(time + "h");
        
        //Entry box
        var textEntry = $("<textarea>");
        textEntry.addClass("col-md-10");
        
        //save buton
        var saveBtn = $("<button>");
        saveBtn.addClass("col-md-1 btn btn-info");
        var saveIcon = $("<i>");
        saveIcon.addClass("far fa-save");
        saveBtn.append(saveIcon);

        //Append the time col, entry box and save button to the block
        block.append(timeCol);
        block.append(textEntry);
        block.append(saveBtn);

        //Append the time block to the planner
        container.append(block);
    }

    //Update the planner
    function updatePlanner(dayObj)
    {
        $(".block").each(function(index){
            console.log($(this).children());
            var time = $(this).children("div");
            $(this).children("textarea").text(dayObj[time.text()]);
        });
    }
});