$(document).ready(function(){
    //array of times for reference
    var Times = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];
    var container = $("#planner");
    
    //Build the planner by iteraing through the array
    Times.forEach(function(time){
        buildBlock(time);
    })

    //Bind eventlistener to each save button
    $(".btn").click(function(){
        entry = $(this).siblings("textarea").val();
        hour = $(this).siblings("div").text();

        //Save the hour and corresponding entry to local storage
        savePlan(hour, entry);
    });

    function savePlan(hour, entry)
    {
        localStorage.setItem(hour, entry);
    }

    //Build a time block
    function buildBlock(time){
        //build the outer block
        var block = $("<div>");
        block.attr("id", time);
        block.attr("class", "row border-top border-bottom");

        //Col for displaying time
        var timeCol = $("<div>");
        timeCol.addClass("col-md-1");
        timeCol.text(time + "h00");
        
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
});