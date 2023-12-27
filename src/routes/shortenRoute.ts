import linkModel from "../model/linkModel";
import { Router } from "express";
const router = Router();
router.get("/", async (req, res) => {
  const shortUrls = await linkModel.find();
  res.render("index", { shortUrls });
});
router.post("/", async (req, res) => {
  await linkModel.create({ full: req.body.fullUrl });
  res.redirect("/shortens");
});
router.get("/:shortUrl", async (req, res) => {
  const shortUrl = await linkModel.findOne({ short: req.params.shortUrl });
  if (!shortUrl) return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.full);
});
export default router;
