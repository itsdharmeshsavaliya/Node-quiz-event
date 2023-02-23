const { getClass, classAdd } = require('../Controller/class-controller');


const router = require('express').Router();
const { checkToken } = require('../auth/token-validation');

router.get("/",checkToken, getClass)
router.post("/", checkToken, classAdd)

module.exports = router;