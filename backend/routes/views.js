const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("home", { path: req.path });
});

router.get("/cart", (req, res) => {
  res.render("cart", { path: req.path });
});

router.get("/article", (req, res) => {
  res.render("article", { path: req.path, articleId: req.query.id });
});

module.exports = router;
