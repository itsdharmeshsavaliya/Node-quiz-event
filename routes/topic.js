const { listTopic,addTopic } = require('../Controller/topic-controller');
const router = require('express').Router();

router.get("/:class_id",listTopic);
router.post("/",addTopic);


module.exports = router;