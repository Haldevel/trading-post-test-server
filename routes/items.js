const express = require("express");
//const router = express.Router();
const router = express.Router({ mergeParams: true });  //if we have multiple params

const itemController = require("../controllers/itemsController");

router.route("/:sortMethod")
    .get(itemController.getAllItems)

router.route("/:itemId")
    .delete(itemController.deleteItem)
    .get(itemController.getSingleItem)
    .put(itemController.updateItem)

router.route("/")   //    /api/items/:userid
    .post(itemController.addItem)

/* router.route("/single/:itemId")
    .get(itemController.getSingleItem)
    .put(itemController.updateItem) */


module.exports = router;