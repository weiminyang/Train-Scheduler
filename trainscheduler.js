

  var firebaseConfig = {
    apiKey: "AIzaSyCD-FeLlYAog_yB1z7K2stTVTmFmBZfKmQ",
    authDomain: "trainscheduler-3690d.firebaseapp.com",
    databaseURL: "https://trainscheduler-3690d.firebaseio.com",
    projectId: "trainscheduler-3690d",
    storageBucket: "trainscheduler-3690d.appspot.com",
    messagingSenderId: "955608552824",
    appId: "1:955608552824:web:fe7abd75a021683f"
  };

  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();



  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = moment($("#first-train-time").val().trim(),"HH:mm").format("HH:mm");
    var frequency = $("#frequency").val().trim();

    var newTrain={
        name:trainName,
        destination:destination,
        firstTrainTime:firstTrainTime,
        frequency:frequency
    };

    database.ref().push(newTrain);
  
    alert("New train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");
  });

  database.ref().on("child_added", function(childSnapshot) {
    // Store everything into a variable.
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;
  
    var now = moment().format("HH:mm");
      var a = now.split(':');
      var b = firstTrainTime.split(':');
    var diff = Math.abs((+a[0]) * 60 + (+a[1])-(+b[0]) * 60 - (+b[1]));
      
    var minutesAway = frequency - diff%frequency;
    var minute = ((+a[0]) * 60 + (+a[1]) + minutesAway)%60;
    
    var day=parseInt(((+a[0]) * 60 + (+a[1]) + minutesAway)/1440);
    console.log(minute);
    if(minute<10){
      minute="0"+minute;
    }
    console.log(minute);
    var nextArrival;
    if(day>0){
    nextArrival = "+"+day +" "+parseInt(((+a[0]) * 60 + (+a[1]) + minutesAway-day*1440)/60)+':'+minute;
    }
    else
    {
      nextArrival =parseInt(((+a[0]) * 60 + (+a[1]) + minutesAway-day*1440)/60)+':'+minute;  
    }
  
 
    var newRow = $("<tr>").append(
      $("<td>").text(name),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $('<td id="next-arrival">').text(nextArrival),
      $('<td id="minutes-away">').text(minutesAway),
    );
  
    // Append the new row to the table
    $("#train-schedule > tbody").append(newRow);
  });

  
  // setInterval(run, 6000);

// function deleteChild(){
//   database.ref().on("child_remove", function(childSnapshot) {
   
//     snapshot.val()[0].removeValue();
    
//   });

// }

// $("<td>").on("click", function(event) {
//   deleteChild();
// });