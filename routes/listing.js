const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer=require("multer");
const {storage} =require("../cloudConfig.js");
const upload=multer({storage});
//index route
//to show all title list in homepage
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
  isLoggedIn,
  //multer process the image and gather it in req.file
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.CreateListing))

  
//new route
//to create new
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
  .get(wrapAsync(listingController.ShowRoute))
  .put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.UpdateListing)
  )
  .delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.DestroyListing)
  );


//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
