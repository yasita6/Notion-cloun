const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3001;
require("dotenv").config();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
)


app.use(express.json());
app.use("/api/v1", require("./src/v1/routes"));


// DB接続
try {
// mongoose.connect(process.env.MONGODB_URL);
mongoose.connect("mongodb+srv://dreamworldplay6:dOv3oY6g1cTYe3ye@cluster0.vty3ebv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
console.log("DB接続中・・・");
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
//   console.log("ローカルサーバー起動中・・・");
// });
console.log(`ローカルサーバー起動中・・・http://localhost:${PORT}`);
});

