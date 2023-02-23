const { registration, userById,updateUser,login,subscription,subscriptionDetail } = require('../Controller/user-controller');


const router = require('express').Router();
const { checkToken } = require('../auth/token-validation');


router.get("/subscription/",checkToken,subscriptionDetail)
router.post("/", registration)
router.get("/:user_id", checkToken, userById)
router.patch("/", checkToken, updateUser)
router.post("/login",login);
router.post("/subscription/",checkToken,subscription)

module.exports = router;