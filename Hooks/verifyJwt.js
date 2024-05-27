const jwt = require("jsonwebtoken");
exports.verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unAuthorize access" });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "forbidden access" });
    }

    if (decoded) {
      req.decoded = decoded;
      next();
    }
  });
};
