const { create,getCategory } = require("../Services/category-service");

module.exports = {
    addCategory: (req,res) => {
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

    listCategory : (req,res) => {
        req.body.topic_id = req.params.topic_id
        const body = req.body;
        getCategory(body,(err,results) => {
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