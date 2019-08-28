const Report = require("../models/report");

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
    Report.create(propertyParams)
      .then(report => {
        req.flash("success", `Report for site ${report.code} has been created`);
        res.locals.redirect = "/reports";
        res.locals.report = report;
        next();
      })
      .catch(error => {
        console.log(`Error saving user: ${error.message}`);
        res.locals.redirect = "/reports/new";
        req.flash("error", `Failed to create report for site code ${error.message}.`);
        next();
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  index: (req, res, next) => {
    Report.find()
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
  },
  show: (req, res, next) => {
    let reportId = req.params.id;
    Report.findById(reportId)
      .then(report => {
        res.locals.report = report;
        next();
      })
      .catch(error => {
        console.log(`Error fetching report by ID: ${error.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("reports/show");
  },
  edit: (req, res, next) => {
    let reportId = req.params.id;
    Report.findById(reportId)
      .then(report => {
        res.render("reports/edit", {
          report: report
        });
      })
      .catch(error => {
        console.log(`Erro fetching report by ID: ${error.message}`);
      });
  },
  update: (req, res, next) => {
    let reportId = req.params.id;
    let reportParams = {
      brand: req.body.brand,
      flag: req.body.flag,
      code: req.body.code,
      address: {
        city: req.body.city,
        state: req.body.state
      }
    };
    Report.findByIdAndUpdate(reportId, {
      $set: reportParams
    })
      .then(report => {
        res.locals.redirect = `/reports/${reportId}`;
        res.locals.report = report;
        next();
      })
      .catch(error => {
        console.log(`Error updating report by ID: ${error.message}`);
        next(error);
      });
  },
  delete: (req, res, next) => {
    let reportId = req.params.id;
    Report.findByIdAndRemove(reportId)
      .then(() => {
        res.locals.redirect = "/reports";
        next();
      })
      .catch(error => {
        console.log(`Error deleting report by ID: ${error.message}`);
        next();
      });
  }
};
