const express = require("express");
const cors = require("cors");

/*const userRouter = require("./routes/users.routes");
const videoRouter = require("./routes/videos.routes");
const bookRequestRouter = require("./routes/bookRequests.routes");
const supplicationRouter = require("./routes/supplications.routes");
const bookRouter = require("./routes/books.routes");
const groupRouter = require("./routes/groups.routes");
const visaRouter = require("./routes/visa.routes"); */
const authRouter = require("./routes/auth.routes");
require("../db/connect");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(authRouter);
/*app.use(userRouter);
app.use(videoRouter);
app.use(bookRouter);
app.use(supplicationRouter);
app.use(bookRequestRouter);
app.use(groupRouter);
app.use(visaRouter); */

app.get("/", (req, res) => res.send("Hello Server!"));
app.listen(port, () => console.log(`Server is listening on port ${port}`));
