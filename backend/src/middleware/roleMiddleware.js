const roleAuthorization = (allowedRoles = []) => {

return (req,res,next) => {

try{

const loggedInUserRole = req.user?.role;

if(!loggedInUserRole){

return res.status(401).json({

message:"User role not found"

});

}


const hasAccess = allowedRoles.includes(
loggedInUserRole
);


if(!hasAccess){

return res.status(403).json({

message:"You do not have permission to access this resource"

});

}


next();

}
catch(error){

console.log(
"Role middleware error:",
error
);

return res.status(500).json({

message:"Authorization process failed"

});

}

};

};

export default roleAuthorization;
