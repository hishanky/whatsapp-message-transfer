const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
mongoose = require("mongoose");
const message = require("./routes/message.routes");
const cache = require("./config/cache");
app.use(cors());

cache();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./config/db.config");
try {
  mongoose.connect(db.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("connected to db");
} catch (error) {
  console.log(error);
  handleError(error);
}
process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});

app.use("/whatsapp", message);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
