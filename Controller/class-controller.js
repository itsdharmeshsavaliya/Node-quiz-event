const { classList,create, removeClass } = require("../Services/class-service");

module.exports = {
    getClass : (req, res) => {
            classList((err,results) => {
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
    classAdd : (req, res) => {
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
    removeClass:(req,res)=>{
        req.body.class_id=req.params.class_id;
        const body = req.body;
        removeClass(body,(err,results)=>{
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
        })
    }
}