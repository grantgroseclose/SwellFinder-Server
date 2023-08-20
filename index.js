const dotenv = require('dotenv');
const express = require("express");

dotenv.config({ path: require('find-config')('.env') });

const connectDB = require('./connectDB');
const SpotModel = require('./models/Spots');
const UserModel = require('./models/Users');

const users = require("./routes/users");
const user = require("./routes/user");
const auth = require("./routes/auth");
const spots = require("./routes/spots");
const spot = require("./routes/spot");
const tide = require("./routes/tide");
const helmet = require("helmet");
const compression = require("compression");
const config = require("config");
const app = express();

connectDB();

app.use(express.json());
app.use(helmet());
app.use(compression());

app.use(express.static("public"));
app.use("/api/users", users);
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/spot", spot);
app.use("/api/spots", spots);
app.use("/api/tide", tide);

const port = config.get("port");
app.listen(port, function() {
  console.log(`Server started on port ${port}...`);
});