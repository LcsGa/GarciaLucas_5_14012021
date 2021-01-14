const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("home", { path: req.path });
});

router.get("/cart", (req, res) => {
  res.render("cart", { path: req.path });
});

module.exports = router;
