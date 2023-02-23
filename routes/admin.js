const { getUser } = require('../Controller/user-controller');
const { getClass, classAdd, removeClass } = require('../Controller/class-controller');
const { addTopic, listTopic, removeTopic } = require('../Controller/topic-controller');
const { getQuestion, addQuestion, deleteQuestion, setAnswer } = require('../Controller/question-controller');
const { getoption, addOption, deleteOption } = require('../Controller/option-controller');
const router = require('express').Router();
//const { checkToken } = require('../auth/token-admin-validation');

router.get("/users", getUser);
router.get("/class", getClass);
router.post("/class", classAdd);
router.get("/topic/:class_id", listTopic);
router.post("/topic", addTopic);
router.get("/topicDelete/:topic_id", removeTopic);
router.get("/classDetele/:class_id", removeClass);
router.get("/questionDetele/:question_id", deleteQuestion);
router.get("/question/:topic_id", getQuestion);
router.post("/question", addQuestion)
router.get("/options/:question_id", getoption)
router.post("/options/", addOption)
router.post("/setAnswer/", setAnswer)
router.get("/optionDelete/:option_id", deleteOption)

module.exports = router;