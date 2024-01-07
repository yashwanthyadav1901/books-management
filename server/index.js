const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes");

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(routes);

app.listen(3008, () => {
  console.log("server running on port 3008");
});
