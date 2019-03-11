$(document).ready(function () {

    var tName = $("#nameInput").val().trim();
    var tDestination = $("#destInput").val().trim();
    var tTime = $("#timeInput").val().trim();
    var tFrequency = 10;

    // var nextArrival = $("#").val().trim();
    // var milesAway = $("#").val().trim();
    $("#submitButton").on("click", function (event) {
        event.preventDefault();

        // First Time (pushed back 1 year to make sure it comes before current time)
        var tTimeConverted = moment(tTime, "HH:mm").subtract(1, "year");
        console.log(tTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(tTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Generate random frequency of train
        tFrequency = Math.floor((Math.random() * 51) + 5);
        console.log(tFrequency);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        $("input").val("");
    });
});