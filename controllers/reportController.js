const Property = require("../models/report");

module.exports = {
  new: (req, res) => {
    res.render("createReport");
  },
  create: (req, res, next) => {
    let propertyParams = {
      brand: req.body.brand,
      flag: req.body.flag,
      code: req.body.code,
      address: {
        city: req.body.city,
        state: req.body.state
      }
    };
    Property.create(propertyParams)
      .then(user => {
        res.locals.redirect = "/reports/index";
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
  },
  index: (req, res, next) => {
    Property.find()
      .then(reports => {
        res.locals.reports = reports;
        next();
      })
      .catch(error => {
        console.log(`Error fetching reports: ${error.message}`);
        res.redirect("/");
      });
  },
  indexView: (req, res) => {
    res.render("reports/index");
  }
};
