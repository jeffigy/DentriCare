require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOption");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const { logEvents } = require("./middleware/logger");

console.log(process.env.NODE_ENV);
connectDB();

app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/patients", require("./routes/patientRoutes"));
app.use("/procedures", require("./routes/procedureRoutes"));
app.use("/dental-notes", require("./routes/dentalNoteRoutes"));
app.use("/appointments", require("./routes/appointmentRoutes"));
app.use("/payments", require("./routes/paymentRoutes"));
app.use("/installment-payments", require("./routes/installmentPaymentRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
});

mongoose.connection.on("error", (error) => {
  console.log(error);
  logEvents(
    `${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`,
    "mongoErrorlog.log"
  );
});
