const mongoose = require("mongoose");
const Document = require("./models/Document");
const docRoute = require("./routes/docRoute");
const express = require("express");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

dotenv.config();
mongoose.connect(process.env.mongo_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/document", docRoute);
app.use("/api/user", userRoute);
// app.use(express.static(path.join(__dirname, "./frontend/build")));
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./frontend/build/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });
app.listen(process.env.PORT, () => {
  console.log(`listening on http://localhost:${process.env.PORT}`);
});
