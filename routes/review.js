const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/WrapAsync.js");
const {validateReview,isReviewAuthor, isLoggedIn} =require("../middleware.js")
const reviewControllers=require("../controllers/reviews.js");
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewControllers.CreateReview)
  );
  

  router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewControllers.DestroyReview))

  module.exports=router;