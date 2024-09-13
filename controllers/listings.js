const Listing = require("../models/listing.js");


module.exports.renderNewForm =(req, res) => {
    res.render("listings/new.ejs");
  }

module.exports.ShowRoute=async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({path:"reviews",
        populate:{
          path:"author",
        }
      })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing });
}

module.exports.CreateListing=async (req, res, next) => {
    let url=req.file.path;
    let filename=req.file.filename;

    const newListing = new Listing(req.body.listing);
   console.log(newListing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  }

  module.exports.index = async (req, res) => {
    const category = req.query.category; // Get category from query parameters
    let filter = {};
  
    if (category) {
      filter.category = category; // If category is present in the query, filter by it
    }
  
    try {
      const alllistings = await Listing.find(filter); // Fetch listings with or without the filter
      res.render("./listings/index.ejs", { alllistings });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  };
  
module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });

  }

module.exports.UpdateListing=async (req, res) => {
    let { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    
    if(typeof req.file !== "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  }

module.exports.DestroyListing=async (req, res) => {
    let { id } = req.params;
    let deleteval = await Listing.findByIdAndDelete(id);
    console.log(deleteval);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  }

