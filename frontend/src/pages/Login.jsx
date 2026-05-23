const userRole = response.data.role;

localStorage.setItem(
"token",
response.data.token
);

localStorage.setItem(
"userRole",
userRole
);


if(userRole==="ADMIN"){

window.location.href="/dashboard";

}
else{

window.location.href="/profile";

}