const { getQuestion, addQuestion, getOption, saveResponse, likeQuestion, likedQuestion, lastAnswered, Result, getCustomQuestion, ResetResponse, statics } = require('../Controller/question-controller');


const router = require('express').Router();
const { checkToken } = require('../auth/token-validation');

router.post("/likedQuestion/", checkToken, likedQuestion)
router.get("/result/statics/", checkToken, statics)
router.get("/:topic_id", checkToken, getQuestion)
router.get("/options/:question_id", checkToken, getOption)
router.post("/", checkToken, addQuestion)
router.post("/saveResponse", checkToken, saveResponse)
router.post("/likeQuestion", checkToken, likeQuestion)
router.post("/results/", checkToken, Result)
router.post("/getCustomQuestion/", checkToken, getCustomQuestion)
router.post("/ResetResponse/", checkToken, ResetResponse)
router.post("/lastAnswered/", checkToken, lastAnswered)

module.exports = router;