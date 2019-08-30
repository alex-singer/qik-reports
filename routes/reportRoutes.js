const router = require("express").Router();
const reportController = require("../controllers/reportController");

router.get("/", 
    reportController.index,
    reportController.indexView);
router.get("/new", 
    reportController.new);
router.post("/create", 
    reportController.create, 
    reportController.redirectView);
router.get("/:id", 
    reportController.show,
    reportController.showView);
router.get("/:id/edit", 
    reportController.edit);
router.put("/:id/update", 
    reportController.update,
    reportController.redirectView);
router.delete("/:id/delete", 
    reportController.delete,
    reportController.redirectView);

module.exports = router;

