const jwt = require("jsonwebtoken");
const Document = require("../models/Document");
const mongoose = require("mongoose");
// verify a user is allowed to see the specified resource

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.token;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};
// user is owner of that document ?
const isOwner = async (req, res, next) => {
  try {
    console.log(req.user);
    const doc = await Document.findById(req.body.docId);
    if (doc.owner == req.user.id) {
      console.log(doc.owner);
      next();
    } else {
      return res
        .status(401)
        .json({ message: "you are not owner of this document" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
module.exports = { verifyToken, isOwner };
