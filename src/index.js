const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/users.routes");
const jobRouter = require("./routes/jobs.routes");
const cityRouter = require("./routes/city.routes");
const subjectRouter = require("./routes/subjects.routes");
const classRouter = require("./routes/classes.routes");
const areaRouter = require("./routes/area.routes");
const achievementRouter = require("./routes/achievements.routes");
const applicationRouter = require("./routes/applications.routes");
require("./dbconnect");

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

app.use(applicationRouter);
app.use(achievementRouter);
app.use(authRouter);
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
