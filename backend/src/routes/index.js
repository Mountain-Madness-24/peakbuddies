const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("you are logged in now you can close this page!");
  res.redirect("/"); // Redirect to the home page
});

module.exports = router;
