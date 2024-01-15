const jwt = require("jsonwebtoken");
const Client = require("../models/client.model");

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "kljlksdjf2oi3jlkj32"
      );
      req.user = await Client.findById(decoded.id, {
        password: 0,
      })
        .populate("complexs reviews shifts")
        .populate({
          path: "favorites",
          populate: "services typeCourts",
        });
      return next();
    } catch (error) {
      return res.status(404).json("Error checking token");
    }
  }
  if (!token) {
    const error = new Error("Token not valid");
    res.status(401).json(error.message);
  }
  next();
};

module.exports = { checkAuth };
