let humidity = 0;
var temperature = 0;
var light = 0;
var water = 0;
var motorValue = 0; // false by default
var lamp = 0; // false by default
var motorBtnId = document.getElementById("motorBtn");
var lampBtnId = document.getElementById("lampBtn");

const firebaseConfig = {
  apiKey: "AIzaSyAt8-rsXFpMZ_GvI7t3hVCaRu7Yp6oBkVs",
  authDomain: "iot-11733.firebaseapp.com",
  databaseURL: "https://iot-11733-default-rtdb.firebaseio.com",
  projectId: "iot-11733",
  storageBucket: "iot-11733.appspot.com",
  messagingSenderId: "992119481",
  appId: "1:992119481:web:9eeac3f47f749f1342a968",
  measurementId: "G-B52MX722FK",
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
// Sensors
var dbHumidity = database.ref("Humid");
var dbTemperature = database.ref("Temperature");
var dbLight = database.ref("Light");
var dbWater = database.ref("Water");
var dbMotion = database.ref("Motion");

// Activators
var dbMotorStatus = database.ref("motorStatus");
var dbLamp = database.ref("Lamp");

// Fetch the data for Sensors
dbHumidity.on("value", function (getdata1) {
  humidity = getdata1.val();
  document.getElementById("humidity_value").innerHTML = humidity + "%";
});

dbTemperature.on("value", function (getdata2) {
  temperature = getdata2.val();
  document.getElementById("temperature_value").innerHTML =
    temperature + "&#8451;";
});

dbLight.on("value", function (getdata2) {
  light = getdata2.val();
  document.getElementById("light_value").innerHTML = light;
});

dbWater.on("value", function (getdata2) {
  water = getdata2.val();
  document.getElementById("water_value").innerHTML = water;
});

dbMotion.on("value", function (getdata2) {
  motion = getdata2.val();
  document.getElementById("motion_value").innerHTML = motion;
});

// Fetch the data for Activators
dbMotorStatus.on("value", function (getdata2) {
  motorValue = getdata2.val();
  console.log("Motor status 2: ", motorValue);
});

dbLamp.on("value", function (getdata2) {
  lamp = getdata2.val();
  console.log("Lamp 2: ", lamp);
});

//motor
setTimeout(() => {
  motorAction(motorValue);
}, 2000);

function motorAction(value) {
  if (value == 1) {
    motorBtnId.classList.add("btn-primary");
    motorBtnId.classList.remove("btn-outline-danger");
    motorBtnId.innerHTML = "ON";
  } else {
    motorBtnId.classList.remove("btn-primary");
    motorBtnId.classList.add("btn-outline-danger");
    motorBtnId.innerHTML = "OFF";
  }
}

function onClickMotor() {
  if (motorValue == 1) {
    sendMotorData(0);
  } else {
    sendMotorData(1);
  }
  setTimeout(() => {
    motorAction(motorValue);
  }, 100);
}

function sendMotorData(value) {
  firebase.database().ref("motorStatus").set(value);
}

// lamp
setTimeout(() => {
  lampAction(lamp);
}, 2000);

function lampAction(value) {
  if (value == 1) {
    lampBtnId.classList.add("btn-primary");
    lampBtnId.classList.remove("btn-outline-danger");
    lampBtnId.innerHTML = "ON";
  } else {
    lampBtnId.classList.remove("btn-primary");
    lampBtnId.classList.add("btn-outline-danger");
    lampBtnId.innerHTML = "OFF";
  }
}

function onClickLamp() {
  sendLampData(!lamp);
  setTimeout(() => {
    lampAction(lamp);
  }, 100);
}

function sendLampData(value) {
  firebase.database().ref("Lamp").set(value);
}

console.log("Motor status: ", motorValue);

// function press() {
//     index++;
//     if (index%2==1) {
//     database.ref('LED').set("1");
//     document.getElementById('led').innerHTML="turn off";
// }
// else {
//     database.ref('LED').set("0");
//     document.getElementById('led').innerHTML="turn on";
// }
// }
