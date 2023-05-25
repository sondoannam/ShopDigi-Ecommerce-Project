const Enquiry = require("../models/enquiryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../Utilities/validateMongoDbId");

class EnquiryController {
  createEnquiry = asyncHandler(async (req, res) => {
    try {
      const newEnquiry = await Enquiry.create(req.body);
      res.json(newEnquiry);
    } catch (error) {
      throw new Error(error);
    }
  });
  getEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const getaEnquiry = await Enquiry.findById(id);
      res.json(getaEnquiry);
    } catch (error) {
      throw new Error(error);
    }
  });
  getAllEnquiries = asyncHandler(async (req, res) => {
    try {
      const getallEnquiry = await Enquiry.find();
      res.json(getallEnquiry);
    } catch (error) {
      throw new Error(error);
    }
  });
  updateEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedEnquiry);
    } catch (error) {
      throw new Error(error);
    }
  });
  deleteEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
      res.json(deletedEnquiry);
    } catch (error) {
      throw new Error(error);
    }
  });
}

module.exports = new EnquiryController();
