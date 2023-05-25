const express = require('express');
const enquiryController = require('../controllers/enquiryController');
const { authMiddleware, isAdmin } = require('../middlewares/authenticationHandler');
const router = express.Router();

router.post("/", enquiryController.createEnquiry);
router.put("/:id", authMiddleware, isAdmin, enquiryController.updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin, enquiryController.deleteEnquiry);
router.get("/:id", enquiryController.getEnquiry);
router.get("/", enquiryController.getAllEnquiries);

module.exports = router;