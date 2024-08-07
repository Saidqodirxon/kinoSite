/* eslint-disable no-undef */
const express = require("express");
const path = require("path"); // Modulni import qilishni unutmang

const app = express();

const distPath = path.join(__dirname, "dist");
// const images = path.join(__dirname, "../../e_shop_back/public");

app.use(express.static(distPath));
// app.use(express.static(images));

app.get("/", (req, res) => {
  const distHtmlPath = path.join(distPath, "index.html");
  res.sendFile(distHtmlPath);
});

app.get("/*", (req, res) => {
  const distHtmlPath = path.join(distPath, "index.html");
  res.sendFile(distHtmlPath);
});

app.listen(5000, () => {
  console.log("Frontend ishlayapti, 5000-portni eshitishni kutamiz...");
});
