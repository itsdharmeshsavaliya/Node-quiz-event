const pool = require("../config/database");
const { create,deleteQuestion, getQuestion,getOption,saveResponse,likeQuestion,likedQuestion,Result, getCustomQuestion,lastAnswered,ResetResponse, statics,setAnswer } = require("../Services/question-service");



module.exports = {
    addQuestion : (req, res) => {
        const body = req.body;
        create(body,(err,result)=>{
            if (err){
                console.log(err);
               return res.status(200),json({
                    success:0,
                    message:"Unable to create question",
                });
            }
            return res.status(200).json({
                success:1,
                message:"successfully question added to queue",
                data:result
            });
            
        });
    },
    // updateQuestion : (req, res) => {
    //     const body = req.body;
    //     updateQuestion(body,(err,result)=>{
    //         if (err){
    //             console.log(err);
    //            return res.status(200),json({
    //                 success:0,
    //                 message:"Unable to update question",
    //             });
    //         }
    //         return res.status(200).json({
    //             success:1,
    //             message:"successfully question updated",
    //             data:result
    //         });
            
    //     });
    // },
    // answerQuestion : (req, res) => {
    //     const body = req.body;
    //     answerQuestion(body,(err,result)=>{
    //         if (err){
    //             console.log(err);
    //            return res.status(200),json({
    //                 success:0,
    //                 message:"Unable to answer this question",
    //             });
    //         }
    //         return res.status(200).json({
    //             success:1,
    //             message:"successfully answered this question",
    //             data:result
    //         });
            
    //     });
    // },
    deleteQuestion : (req, res)=>{
        req.body.question_id = req.params.question_id;
        const body = req.body;
        deleteQuestion(body,(err,result)=>{
            if (err){
                console.log(err);
               return res.status(200),json({
                    success:0,
                    message:"question unable delete",
                });
            }
            return res.status(200).json({
                success:1,
                message:"question deleted successfully",
                data:result
            });
            
        });
    },
    getQuestion : (req, res)=>{
        req.body.topic_id = req.params.topic_id;
        const body = req.body;

        getQuestion(body,(err,results)=>{
            if (err){
                console.log(err);
               return res.status(500),json({
                    success:0,
                    message:"question unable to get",
                });
            }
            
            
            return res.status(200).json({
                success:1,
                message:"question list successfully",
                data:results
            });
        });
    },
    getCustomQuestion : (req, res)=>{
        
        const body = req.body;
        getCustomQuestion(body,(err,results)=>{
            if (err){
                console.log(err);
               return res.status(500),json({
                    success:0,
                    message:"question unable to get",
                });
            }
            
            
            return res.status(200).json({
                success:1,
                message:"question list successfully",
                data:results
            });
        });
    },
    getOption : (req,res)=>{
        req.body.question_id = req.params.question_id;
        const body = req.body;
        getOption(body,(err,options)=>{
            if (err){
                console.log(err);
               return res.status(500).json({
                    success:0,
                    message:"option unable to get",
                });
            }
            return res.status(200).json({
                success:1,
                message:"options list successfully",
                data:options
            });
                
            });
    },
    saveResponse : (req,res)=>{
        const body = req.body;
        saveResponse(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:"Response unable to save"
                });
            }
            return res.status(200).json({
                success:1,
                message:"Response Saved Successfully",
                data:results
            });
        })
    },
    ResetResponse:(req,res)=>{
        const body = req.body;
        ResetResponse(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:"Sorry Unable to remove Responses"
                });
            }
            return res.status(200).json({
                success:1,
                message:"Response Cleared",
                data:results
            });
        })
    },
    likeQuestion : (req,res) => {
        const body = req.body;
        likeQuestion(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:"Like unable to save"
                });
            }
            return res.status(200).json({
                success:1,
                message:"Liked Successfully",
                data:results
            });
        });
    },
    likedQuestion : (req,res) =>{
        //console.log(req)
        const body = req.body;
        likedQuestion(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:"Liked not available"
                });
            }
            return res.status(200).json({
                success:1,
                message:"Liked questions",
                data:results
            });
        })
    },
    Result : (req,res) => {
        const body = req.body;
        Result(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:"Result Not available"
                });
            }
            return res.status(200).json({
                success:1,
                message:"Result is Here",
                data:results
            });
        })
    },
    statics:(req,res) => {
        const body = req.body;
        statics(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:"Statics Not available"
                });
            }
            return res.status(200).json({
                success:1,
                message:"Statics is Here",
                data:results
            });
        })
    },
    setAnswer : (req,res)=>{
        const body = req.body;
        setAnswer(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:"Statics Not available"
                });
            }
            return res.status(200).json({
                success:1,
                message:"Statics is Here",
                data:results
            });
        })
    },
    lastAnswered : (req,res)=>{
        const body = req.body;
        lastAnswered(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:"Start from beginning"
                });
            }
            return res.status(200).json({
                success:1,
                message:"Start from here",
                data:results
            });
        })
    }

}