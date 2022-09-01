const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/users.routes");
const jobRouter = require("./routes/jobs.routes");
const cityRouter = require("./routes/city.routes");
const areaRouter = require("./routes/area.routes");
const applicationRouter = require("./routes/applications.routes");
require("./dbconnect");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(applicationRouter);
app.use(authRouter);
app.use(userRouter);
app.use(jobRouter);
app.use(cityRouter);
app.use(areaRouter);

app.get("/", (req, res) => {
  res.send("Hello Server!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
