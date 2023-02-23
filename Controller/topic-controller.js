const { create,getTopic,removeTopic } = require("../Services/topic-service");

module.exports = {
    addTopic: (req,res) => {
        const body = req.body;
        create(body,(err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connection error",
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        });
    },

    listTopic : (req,res) => {
        req.body.class_id = req.params.class_id
        const body = req.body;
        getTopic(body,(err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"user list not found"
                });
            }
            return res.status(200).json({
                success:1,
                message:"successful",
                data:results
            })
        });

    },
    removeTopic : (req,res) => {
        req.body.topic_id = req.params.topic_id
        const body = req.body;
        //console.log(body);
        removeTopic(body,(err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"user list not found"
                });
            }
            return res.status(200).json({
                success:1,
                message:"successful",
                data:results
            })
        });

    },
}