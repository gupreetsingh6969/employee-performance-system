const accountRole = response.data.role || "EMPLOYEE";

localStorage.setItem(
"token",
response.data.token
);

localStorage.setItem(
"userRole",
accountRole
);

localStorage.setItem(
"userName",
response.data.name || "User"
);


// Navigation after successful login

if(accountRole === "ADMIN"){

window.location.href="/dashboard";

}
else{

window.location.href="/profile";

}