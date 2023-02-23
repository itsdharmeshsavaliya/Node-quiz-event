const { optionList,create,deleteOption } = require("../Services/option-service");

module.exports = {
    getoption : (req, res) => {
        req.body.question_id = req.params.question_id;
        const body = req.body;
        optionList(body,(err,results) => {
                    if(err){
                        console.log(err);
                        return res.status(500).json({
                            success:0,
                            message:"class list not found"
                        });
                    }
                    return res.status(200).json({
                        success:1,
                        message:"successful",
                        data:results
                    })
            });
    },
    addOption : (req, res) => {
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
    deleteOption:(req,res)=>{
        req.body.option_id = req.params.option_id;
        const body = req.body;
        deleteOption(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"unable to delete"
                });
            }
            return res.status(200).json({
                success:1,
                message:"Successfully Deleted",
                data:results
            })
        })
    }
}