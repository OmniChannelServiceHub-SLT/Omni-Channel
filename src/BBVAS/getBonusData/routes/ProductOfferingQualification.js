import express from "express";
import { createProductOfferingQualification } from "../services/ProductOfferingQualificationService.js";

const router = express.Router();

/**
 * POST /productOfferingQualification
 * TMF679 - Check subscriber eligibility for multiple product offerings
 */
router.post("/", async (req, res) => {
  try {
    const result = await createProductOfferingQualification(req.body);

    if (result.success) {
      res.status(result.status).json(result.data);
    } else {
      res.status(result.status).json({ message: result.message });
    }
  } catch (err) {
    console.error("Error in ProductOfferingQualification:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
