import jwt from "jsonwebtoken";

const authMiddleWare = (req, res, next) => {
 const token = req.headers.authorization || req.headers.Authorization;

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid Token" });

    req.userInfo = decoded;
    next();
  });
};

export default authMiddleWare;
