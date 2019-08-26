const Property = require("../models/property");

module.exports = {
  new: (req, res) => {
    res.render("createReport");
  },
  create: (req, res, next) => {
    let propertyParams = {
      name: req.body.name,
      code: req.body.code,
      address: {
        city: req.body.city,
        state: req.body.state
      }
    };


    Property.create(propertyParams)
      .then(user => {
        res.locals.redirect = "/reports/new";
        // res.locals.property = property;
        next();
      })
    .catch(error => {
      console.log(`Error saving user: ${error.message}`);
      next(error);
    });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  }
};
