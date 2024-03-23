import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, "secretKey");
    req.userId = decoded.userId;
    req.doctorid = decoded.doctorid;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default jwtAuth;
