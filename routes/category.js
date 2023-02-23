const { addCategory, listCategory } = require('../Controller/category-controller');


const router = require('express').Router();
const { checkToken } = require('../auth/token-validation');

router.get("/:topic_id",checkToken, listCategory)
router.post("/", checkToken, addCategory)

module.exports = router;