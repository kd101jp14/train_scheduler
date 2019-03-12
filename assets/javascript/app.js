$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDkQsr2TXlnWIdEUQCvT1XxIXmBmW4tOhM",
        authDomain: "train-schedule-hw-b34f3.firebaseapp.com",
        databaseURL: "https://train-schedule-hw-b34f3.firebaseio.com",
        projectId: "train-schedule-hw-b34f3",
        storageBucket: "train-schedule-hw-b34f3.appspot.com",
        messagingSenderId: "408493687789"
    };
    firebase.initializeApp(config);

    // Set variable for database
    var database = firebase.database();

    $("#submitButton").on("click", function (event) {

        // Stop button from submitting form
        event.preventDefault();

        var tName = $("#nameInput").val().trim();
        var tDestination = $("#destInput").val().trim();
        var tTime = $("#timeInput").val().trim();
        var tFrequency = $("#frequencyInput").val().trim();
        var nextTrain = "";
        var tMinutesTillTrain = 0;

        // Time of first train (pushed back 1 year to make sure it comes before current time)
        var tTimeConverted = moment(tTime, "HH:mm").subtract(1, "year");
        console.log(tTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between time of first train and current time
        var diffTime = moment().diff(moment(tTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minutes left until next train
        tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Arrival time of next train
        nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        // Keys and values for Firebase database
        var trainInfo = {
            trainName: tName,
            destination: tDestination,
            firstTrain: tTime,
            frequency: tFrequency,
            nextTrain: nextTrain,
            minutesAway: tMinutesTillTrain
        };

        // Push keys and values to database
        database.ref().push(trainInfo);

        $("input").val("");
    });

    database.ref().on("child_added", function (childSnapshot) {
        // Log changes
        console.log(childSnapshot.val());

        // Save changes as variables
        var tName = childSnapshot.val().trainName;
        var tDestination = childSnapshot.val().destination;
        var tTime = childSnapshot.val().firstTrain;
        var tFrequency = childSnapshot.val().frequency;
        var nextTrain = childSnapshot.val().nextTrain;
        var minutesAway = childSnapshot.val().minutesAway;

        // Log new values individually
        console.log(tName);
        console.log(tDestination);
        console.log(tTime);
        console.log(tFrequency);
        console.log(nextTrain);
        console.log(minutesAway);

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(tName),
            $("<td>").text(tDestination),
            $("<td>").text(tFrequency),
            $("<td>").text(nextTrain),
            $("<td>").text(minutesAway)
        );

        // Append the new row to the table
        $(".table > tbody").append(newRow);
    });
});