console.log("JS is wokring");
document.getElementById("registerForm").addEventListener("submit", function(e){

let name = document.getElementById("name").value.trim();
let email = document.getElementById("email").value.trim();
let password = document.getElementById("password").value.trim();

if(name === ""){
    alert("Name cannot be empty");
    e.preventDefault();
    return;
}

if(!email.includes("@")){
    alert("Enter a valid email");
    e.preventDefault();
    return;
}

if(password.length < 6){
    alert("Password must be at least 6 characters");
    e.preventDefault();
    return;
}

});