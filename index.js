const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./src/routes/auth.routes");
const userRouter = require("./src/routes/users.routes");
const jobRouter = require("./src/routes/jobs.routes");
const cityRouter = require("./src/routes/city.routes");
const subjectRouter = require("./src/routes/subjects.routes");
const classRouter = require("./src/routes/classes.routes");
const areaRouter = require("./src/routes/area.routes");
const achievementRouter = require("./src/routes/achievements.routes");
const applicationRouter = require("./src/routes/applications.routes");
require("./dbconnect");

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: true,
  credentials: true,
  allowedHeaders: ["content-type", "Authorization", "set-cookie"],
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use(authRouter);
app.use(applicationRouter);
app.use(achievementRouter);
app.use(userRouter);
app.use(jobRouter);
app.use(cityRouter);
app.use(areaRouter);
app.use(subjectRouter);
app.use(classRouter);

app.get("/", (req, res) => {
  res.send("Hello Server!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
