export function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // simple fake validation
  if (token !== "valid-token") {
    return res.status(403).json({ message: "Invalid token" });
  }

  req.user = { id: 1 };
  next();
}