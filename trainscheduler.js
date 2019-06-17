

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
  var diff = (+a[0]) * 60 + (+a[1])-(+b[0]) * 60 + (+b[1]);
    if(diff<0){
    diff=diff+24*60;}
    if(diff<0){
      diff=diff+24*60;}
    if(diff<0){
      diff=diff+24*60;}
  var minutesAway = frequency - diff%frequency;
  var nextArrival = parseInt(((+a[0]) * 60 + (+a[1]) + minutesAway)/60)+':'+((+a[0]) * 60 + (+a[1]) + minutesAway)%60;
   
  
 
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

  function run(){
    database.ref().on("child_added", function(childSnapshot) {
      // Store everything into a variable.
      var name = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var firstTrainTime = childSnapshot.val().firstTrainTime;
      var frequency = childSnapshot.val().frequency;
    
      var now = moment().format("HH:mm");
      var a = now.split(':');
      var b = firstTrainTime.split(':');
    var diff = (+a[0]) * 60 + (+a[1])-(+b[0]) * 60 + (+b[1]);
      if(diff<0){
      diff=diff+24*60;}
      if(diff<0){
        diff=diff+24*60;}
      if(diff<0){
        diff=diff+24*60;}
    var minutesAway = frequency - diff%frequency;
    var nextArrival = parseInt(((+a[0]) * 60 + (+a[1]) + minutesAway)/60)+':'+((+a[0]) * 60 + (+a[1]) + minutesAway)%60;
     
    
   
        
        $("#minutes-away").text(minutesAway);
      
    });
  }
  setInterval(run, 6000);