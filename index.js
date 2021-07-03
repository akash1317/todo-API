const express = require("express");
const app = express();
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
connectDB();

app.use(require("cors")());
app.use(express.json({ extended: true })); // For handling POST Routes
app.use("/api/user", require("./Routes/user"));
app.use("/api/task", require("./Routes/task"));

//Invalid Path
app.post("/*", (req, res) => {
  res.json({ statusCode: 400, msg: "Invalid Path" });
});

app.listen(PORT, () => {
  console.log("Server connected on PORT", PORT);
});
