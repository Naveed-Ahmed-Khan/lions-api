const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("./dbconnect");
const authRouter = require("./src/routes/auth.routes");
const userRouter = require("./src/routes/users.routes");
const jobRouter = require("./src/routes/jobs.routes");
const cityRouter = require("./src/routes/city.routes");
const subjectRouter = require("./src/routes/subjects.routes");
const classRouter = require("./src/routes/classes.routes");
const areaRouter = require("./src/routes/area.routes");
const achievementRouter = require("./src/routes/achievements.routes");
const applicationRouter = require("./src/routes/applications.routes");
const notificationRouter = require("./src/routes/notifications.routes");
const PaymentRouter = require("./src/routes/payments.routes");
const BlacklistRouter = require("./src/routes/blacklists.routes");

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: true,
  // credentials: true,
  // allowedHeaders:
  //   "Origin, Content-Type, X-Auth-Token, Set-Cookie, Authorization, Accept",
  // exposedHeaders: "Set-Cookie",
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use(authRouter);
app.use(applicationRouter);
app.use(achievementRouter);
app.use(notificationRouter);
app.use(userRouter);
app.use(jobRouter);
app.use(areaRouter);
app.use(cityRouter);
app.use(subjectRouter);
app.use(classRouter);
app.use(PaymentRouter);
app.use(BlacklistRouter);

app.get("/", (req, res) => {
  res.send("Hello Server!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
