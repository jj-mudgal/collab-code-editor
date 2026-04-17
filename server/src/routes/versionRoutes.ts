import { Router } from "express";
import {
  getVersions,
  getVersionById,
} from "../versioning/versionStore";
import { computeDiff } from "../versioning/diff";

const router = Router();

router.get("/", (_, res) => {
  res.json(getVersions());
});

router.get("/:id", (req, res) => {
  const version = getVersionById(req.params.id);
  res.json(version);
});

router.get("/diff/:id1/:id2", (req, res) => {
  const v1 = getVersionById(req.params.id1);
  const v2 = getVersionById(req.params.id2);

  if (!v1 || !v2) return res.status(404).send("Version not found");

  res.json(computeDiff(v1.content, v2.content));
});

export default router;
