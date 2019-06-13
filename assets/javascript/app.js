 var config = {
    apiKey: "AIzaSyCQsZWZjJ9c6AALPSQpcMDzlz_M3LRZLYE",
    authDomain: "trainschedule-c46f7.firebaseapp.com",
    databaseURL: "https://trainschedule-c46f7.firebaseio.com",
    projectId: "trainschedule-c46f7",
    storageBucket: "trainschedule-c46f7.appspot.com",
    messagingSenderId: "131949737208",
    appId: "1:131949737208:web:891827106b6ded91"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function(event) {
  event.preventDefault();

  var trainName=$("#trainNameInput").val().trim();
  var destination=$("#destinationInput").val().trim();
  var firstTrain=$("#firstTrainTimeInput").val().trim();
  var frequency=$("#frequencyInput").val().trim();



  

  console.log(trainName)

  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
  };



  database.ref().push(newTrain);



//puts user input for time into HH:mm


  })

  
  database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var firstTrain = childSnapshot.val().firstTrain;


  var inputFormat = "HH:mm"
  var convertedDate = moment(firstTrain, inputFormat)
//converted date is first train


var trainFrequency= frequency;

//current time in HH:mm format
var currentTime = moment().format("HH:mm");
console.log(currentTime)


var diffTime = moment().diff(moment(convertedDate), "minutes");
console.log( "diff time:", diffTime)

var trainRemainder = diffTime % trainFrequency;
console.log(trainRemainder)

var minutesTillTrain = trainFrequency - trainRemainder;
console.log(minutesTillTrain)

var nextTrain = moment().add(minutesTillTrain, "minutes");
var nextTrainDom=moment(nextTrain).format("hh:mm")
    console.log(nextTrainDom)

 
  

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrainDom),
    $("<td>").text(minutesTillTrain),
  
  );



  // Append the new row to the table
  $("#table > tbody").append(newRow);


});
