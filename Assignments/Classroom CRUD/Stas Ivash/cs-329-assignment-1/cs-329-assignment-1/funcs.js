﻿window.onload = function () {

    //Create
    function AddStudent() {
        var student = JSON.stringify({ // turn an object into a json text
            Id: sId.value,
            Major: sMaj.value,
            FirstName: sfNam.value,
            LastName: slNam.value,
            Phone: sPho.value,
            Email: sEma.value
        });
        students.push(student);
        sessionStorage.setItem("students", JSON.stringify(students)); //saving
        console.log("Student info added");
    }

    function DeleteStudent(id) {
        students.splice(id, 1);
        sessionStorage.setItem('students', JSON.stringify(students));
    }

    function Generate() {
        studentsNode.textContent = "";
        for (var i in students) {
            var stuNode = document.createElement('ul');
            stuNode.id = i;
            var remove = document.createElement('span');
            remove.setAttribute('dt', 'remove');
            remove.className = "icono-trash";
            remove.style.cssFloat = "right";
            var edit = document.createElement('span');
            edit.setAttribute('dt', 'edit');
            edit.className = 'icono-asterisk';
            edit.style.cssFloat = 'right';
            SetAttributes(remove, i);
            SetAttributes(edit, i);

            var s = JSON.parse(students[i]);
            stuNode.innerHTML = "<li>" + s.Id + "</li> "
                + "<li>" + s.Major + "</li> "
                + "<li>" + s.FirstName + "</li> "
                + "<li>" + s.LastName + "</li> "
                + "<li>" + s.Phone + "</li> "
                + "<li>" + s.Email + "</li>";

            studentsNode.appendChild(stuNode);
            stuNode.appendChild(remove);
            stuNode.appendChild(edit);

            AssignDeleteListener(remove.getAttribute('dt'), i);
            AssignEditListener(edit.getAttribute('dt'), i);
        }
    }


    function AssignEditListener(text, count) {
        //assigning a listener for the dynamic edit element
        document.getElementById(text + count).addEventListener('click', function handler(e) {
            var currentId = document.getElementById(e.target.id);
            EditStudent(e.target.getAttribute('data')); //passing custom attr val
        }, false);
    }

    function EditStudent(id) {
        //get text element to change
        var allDivsInsideStudentsNode = studentsNode.children;
        var theNodeINeed;
        var s = JSON.parse(students[id]);
        for (var i = 0; i < allDivsInsideStudentsNode.length; i++) {
            if (allDivsInsideStudentsNode[i].id == id) {
                theNodeINeed = allDivsInsideStudentsNode[i]
            }
        }
        var saveButton = document.createElement('span');
        saveButton.type = 'submit';
        saveButton.className = 'icono-sync';
        saveButton.id = 'saveEdit' + id;
        theNodeINeed.innerHTML = "<input class='inp-b' value=" + s.Id + "  id=mod" + id + ">"
        + "<input class='inp-b' value=" + s.Major + " id=maj" + id + ">"
        + "<input class='inp-b' value=" + s.FirstName + " id=fn" + id + ">"
        + "<input class='inp-b' value=" + s.LastName + " id=ln" + id + ">"
        + "<input class='inp-b' value=" + s.Phone + " id=phone" + id + ">"
        + "<input class='inp-b' value=" + s.Email + " id=email" + id + ">";

        studentsNode.children[id].appendChild(saveButton);

        saveButton.addEventListener('click', function (e) {
            var currentId = document.getElementById(e.target.id);

            students[id] = JSON.stringify({
                Id: document.getElementById("mod" + id).value,
                Major: document.getElementById("maj" + id).value,
                FirstName: document.getElementById("fn" + id).value,
                LastName: document.getElementById("ln" + id).value,
                Phone: document.getElementById("phone" + id).value,
                Email: document.getElementById("email" + id).value
            })
            sessionStorage.setItem("students", JSON.stringify(students));
            //display modified items
            Generate();

            console.log('Student info saved');
        }, false);
    }


    function SetAttributes(node, count) {
        node.id = node.getAttribute('dt') + count;
        node.style.cursor = 'pointer';
        node.setAttribute('data', count); //custom attr
    }

    function AssignDeleteListener(text, count) {
        //assigning a listener for the dynamic remove element
        document.getElementById(text + count).addEventListener('click', function (e) {
            var currentId = document.getElementById(e.target.id);
            DeleteStudent(e.target.getAttribute('data')); //passing custom attr val
            Generate();
            currentId.parentNode.remove();
            console.log("Student info  removed");
        }, false);
    }

    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }

        return false;
    }

    function RegExp() {
        var resultRegExp = true;

        //clear
        while (phead.firstChild) {
            phead.removeChild(phead.firstChild);
        }

        if (!(/^\d{9}$/.test(sId.value))) {
            if (!containsObject(sId, errors)) {
                errors.push(sId);
            }
            var kk = document.createElement('p');
            kk.textContent = 'Not valid Id (9-digits required)';
            phead.appendChild(kk);
            resultRegExp = false;
        }
        if (!(/([a-zA-Z]{2,30}\s*)+/.test(sMaj.value))) {
            if (!containsObject(sMaj, errors)) {
                errors.push(sMaj);
            }
            var kk = document.createElement('p');
            kk.textContent = 'Please Enter your Major';
            phead.appendChild(kk);
            resultRegExp = false;
        }
        if (!(/([a-zA-Z]{3,30}\s*)+/.test(sfNam.value))) {
            if (!containsObject(sfNam, errors)) {
                errors.push(sfNam);
            }
            var kk = document.createElement('p');
            kk.textContent = 'Not valid First Name';
            phead.appendChild(kk);
            resultRegExp = false;
        }
        if (!(/([a-zA-Z]{3,30}\s*)+/.test(slNam.value))) {
            if (!containsObject(slNam, errors)) {
                errors.push(slNam);
            }
            var kk = document.createElement('p');
            kk.textContent = 'Not valid Last Name';
            phead.appendChild(kk);
            resultRegExp = false;
        }
        if (!(/^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/.test(sPho.value))) {
            if (!containsObject(sPho, errors)) {
                errors.push(sPho);
            }
            var kk = document.createElement('p');
            kk.textContent = 'Not valid Phone number (xxx)xxx-xxxx';
            phead.appendChild(kk);
            resultRegExp = false;
        }
        return resultRegExp;
    }

    //regexp
    function ValidateInput() {
        for (var i = 0; i < errors.length; i++) {
            errors[i].className = 'inp-b';
        }
        var reg = RegExp(); //validation logic

        if (reg) {
            errors.length = 0; // not emptying the array
            console.log('the result is true')
        }

        if (errors.length == 0) {
            return true
        } else {
            for (var i = 0; i < errors.length; i++) {
                errors[i].className = 'vl-fail';
            }
            return false
        }
    }

    //will execute
    var students = sessionStorage.getItem("students");
    var studentsNode = document.getElementById('students');

    var sId = document.getElementById('Id');
    var sMaj = document.getElementById('major');
    var sfNam = document.getElementById('fName');
    var slNam = document.getElementById('lName');
    var sPho = document.getElementById('Phone');
    var sEma = document.getElementById('Email');

    var allInputs = document.getElementsByClassName('inp-b');
    var phead = document.getElementById('validation-msg');

    var errors = [];

    students = JSON.parse(students);
    if (students == null) {
        students = [];
    }
    Generate();
    document.getElementById('save').addEventListener('click', function () {

        if (ValidateInput()) {
            AddStudent();
            Generate();
            document.getElementById('form').reset();
        }

    }, false);

}