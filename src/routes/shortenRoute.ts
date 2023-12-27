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
export default router;
