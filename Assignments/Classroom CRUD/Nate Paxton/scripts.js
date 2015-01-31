//Functions that are to be executed when DOM is loaded
document.addEventListener("DOMContentLoaded", function() { 

  document.querySelector('#begin').style.display = "block";
  document.querySelector('#main').style.display = "none";

  //Populate the current students table
  updateCurrentTable();

  logTimer("Document ready");
});

//Standalone functions
var began = function(){
	fadeOut(document.querySelector('#begin'));
	document.querySelector('#begin').style.display = "none";
	document.querySelector('#main').style.display = "block";

	logTimer("Begin screen closed, main displayed");
}

//Collects form data, updates students, updates table
var submitCreate = function(){
	var form = document.querySelector('#createForm');
	Students.push(new Student(
			form.firstName.value,
			form.lastName.value,
			form.major.value,
			form.year.value,
			form.GPA.value,
			form.advisor.value
		));
	updateCurrentTable();
	form.reset();
	logTimer("Create Form Reset");
	return false;
}

//Updates the Students table
var updateCurrentTable = function(){
for(var i=0; i<Students.length; i++){
	if (Students[i].posted == false){
		var row = "<tr><td>" +
		Students[i].firstName + " " + Students[i].lastName +
		"</td><td>" + Students[i].year +
		"</td><td>" + Students[i].major +
		"</td></tr>";
		document.querySelector('#currentStudents').innerHTML += row;
		logTimer(Students[i].firstName + " " + Students[i].lastName +
			" added to current students table");
		Students[i].posted = true;
	}	
}}

//Logs messages and times to console
var logTimer = function(message){
	var today = new Date();
	console.log(message + ": " + today.toDateString() + " @ " + today.toTimeString());
}

function fadeOut(element){
	while (element.style.opacity > 0){
		element.style.opacity -= .01;
		console.log(element.style.opacity);
	}
}

//Objects and initial data
function Student(firstName, lastName, major, year, GPA, advisor){
	this.firstName = firstName,
	this.lastName = lastName,
	this.major = major,
	this.year = year,
	this.GPA = GPA,
	this.advisor = advisor
	this.posted = false;
}

var Students = new Array();

//Initial array of Students
Students.push(new Student(
	"Nate",
	"Paxton",
	"Software Engineering",
	"Senior",
	"9.9",
	"Charles Almond"
))

Students.push(new Student(
	"Raylan",
	"Givens",
	"Criminal Justice",
	"Junior",
	"5.4",
	"Rhett Wharton"
))

Students.push(new Student(
	"Mitchell",
	"Adams",
	"Software Engineering",
	"Senior",
	"9.9",
	"Charles Almond"
))