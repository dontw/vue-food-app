var express = require("express");
var port = 8088;
var app = express();
var router = express.Router();

router.get("/", (req, res, next) => {
  req.url = "index.html";
  next();
});

app.use(router);

var goods = require("./data/01-商品页(点菜).json");
var ratings = require("./data/02-商品页(评价).json");
var seller = require("./data/03-商品页(商家).json");

var routes = express.Router();

routes.get("/goods", (req, res) => {
  res.json(goods);
});

routes.get("/ratings", (req, res) => {
  res.json(ratings);
});

routes.get("/seller", (req, res) => {
  res.json(seller);
});

app.use("/api", routes);

//set static dir
app.use(express.static("./dist"));

//launch express
module.express = app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("http://localhost:" + port + "\n");
});
