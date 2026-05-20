const roleMiddleware = (...roles) => {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const userRole = req.user.role?.toUpperCase();

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: "Access forbidden"
      });
    }

    next();
  };
};

export default roleMiddleware;