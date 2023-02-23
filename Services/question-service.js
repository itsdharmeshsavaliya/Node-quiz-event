const pool = require("../config/database");
var base64ToImage = require('base64-to-image');



module.exports = {
    create: (data, callBack) => {
        var base64Str = data.image;
        var path ='./public/question/';
        const imageName = Date.now() + '.png';
        var optionalObj = {'fileName': imageName, 'type':'png'};
        var imageInfo = base64ToImage(base64Str,path,optionalObj); 
        data.image =  '/question/' + imageInfo.fileName;
        pool.query(
            "insert into question(question, topic_id, image,description,time) values(?,?,?,?,?)",
            [
                data.question,
                data.topic_id,
                data.image,
                data.description,
                Math.floor(Date.now() /1000)
            ],
            (error,results,fields) => {
                if(error){
                  return callBack(error);
                }
                return callBack(null,results);
            }
            )
    },
    getQuestion: (data,callBack) => {

        function getOptions(question_id) {
            return new Promise((resolve, reject) => {
              pool.query(
                "SELECT * FROM `option` WHERE question_id = ?",
                [question_id],
                (err, result) => {
                  return err ? reject(err) : resolve(result);
                }
              );
            });
          }
        
        pool.query("SELECT * from `question` WHERE topic_id = ?",
        [
            data.topic_id,
        ],async (err,results,fields) => {
            if(err){
                return callBack(err)
            }else{
                for (let i = 0; i < results.length; i++) {
                    results[i]['option'] = await getOptions(results[i].question_id);
                }
                return callBack(null,results);
            }
        })
    },
    getCustomQuestion: (data,callBack) => {

        function getOptions(question_id) {
            return new Promise((resolve, reject) => {
              pool.query(
                "SELECT * FROM `option` WHERE question_id = ?",
                [question_id],
                (err, result) => {
                  return err ? reject(err) : resolve(result);
                }
              );
            });
          }


        pool.query("SELECT * from question where topic_id = ? LIMIT ?",
        [
            data.topic_id,
            data.limit
        ], async (err,results,fields) => {
            if(err){
                return callBack(err)
            }else{
                for (let i = 0; i < results.length; i++) {
                    results[i]['option'] = await getOptions(results[i].question_id);
                }
                return callBack(null,results);
            }
        })
    },
    getOption : (data,callBack)=>{
        pool.query("SELECT * from option where question_id = ?",[
            data.question_id
        ],(error,options,fields)=>{
            if(error){
                callBack(error);
            }
            //console.log(options);
            return callBack(null,options);
        })
    },
    saveResponse: (data,callBack)=>{
       
        

                pool.query("SELECT * from question where question_id=?",
                [
                    data.question_id
                ],
                (err,question,fields)=>{
                    var right = 0;
                    if(err){
                        console.log(err)
                    }else{
                        if(data.response=='answered'){
                            console.log(question[0].answer);
                            if(data.option_id==question[0].answer){
                                right = 1;
                            }
                        }
                        pool.query("SELECT * from response where question_id=? AND topic_id=? AND user_id=?",
                        [
                            data.question_id,
                            question[0].topic_id,
                            data.user_id
                        ],(err,check,fields)=>{
                            if(err){
                                console.log(err);
                                callBack(err)
                            }else{
                                if(check.length>0){
                                    pool.query("UPDATE response set response=?,answerstatus=?,option_id=?,time=? WHERE resp_id=?",[
                                        data.response,
                                        right,
                                        data.option_id,
                                        Math.floor(Date.now() /1000),
                                        check[0].resp_id
                                    ],(err,results,fields)=>{
                                        if(err){
                                            callBack(err);
                                            console.log(err);
                                        }else{
                                            callBack(null,results)
                                        }
                                    })
                                }else{
                                    pool.query("INSERT INTO response(user_id,question_id,topic_id,response,answerstatus,option_id,time) VALUES(?,?,?,?,?,?,?)",[
                                        data.user_id,
                                        data.question_id,
                                        question[0].topic_id,
                                        data.response,
                                        right,
                                        data.option_id,
                                        Math.floor(Date.now() /1000)
                                    ],(err,results,fields)=>{
                                        if(err){
                                            callBack(err);
                                            console.log(err);
                                        }else{
                                            callBack(null,results)
                                        }
                                    })
                                }
                            }
                        })

                        
                    }
                })       
    },
    ResetResponse:(data,callBack)=>{
        pool.query("DELETE from response where topic_id=? AND user_id=?",[
            data.topic_id,
            data.user_id
        ],(err,deleted,fields)=>{
            if(err){
                callBack(err)
            }else{
                callBack(null,deleted);
            }
        })
    },
    likeQuestion: (data,callBack)=>{

        function likes(value){
            var likeCount = value;

            pool.query("SELECT * FROM question_like where user_id=? AND question_id = ?",[
                data.user_id,
                data.question_id
            ],(err,question_like,fields)=>{
                if(err){
                    console.log(err)
                }
                
                if(question_like.length >0){
                    pool.query("DELETE from question_like where user_id = ? AND question_id=?",[
                        data.user_id,
                        data.question_id
                    ],(err,results,fields)=>{
                        if(err){
                            console.log(err)
                        }else{
                            var like = likeCount-1;
                            pool.query("UPDATE question set likes = ? where question_id=?",[
                                like,
                                data.question_id
                            ],(err,likesData,fields)=>{
                                if(err){
                                    console.log(err)
                                }
                                callBack(null,likesData)
                            })
                        }
                    })
                }else{
                    pool.query("INSERT INTO question_like(user_id,question_id,topic_id,time) VALUES (?,?,?,?)",[
                        data.user_id,
                        data.question_id,
                        data.topic_id,
                        Math.floor(Date.now() /1000)
                    ],(err,results,fields)=>{
                        if(err){
                            console.log(err)
                        }else{
                            var like = likeCount+1;
                            pool.query("UPDATE question set likes = ? where question_id=?",[
                                like,
                                data.question_id
                            ],(err,likesData,fields)=>{
                                if(err){
                                    console.log(err)
                                }
                                callBack(null,likesData)
                            })
                        }
                    })
                }
            })
        }

        pool.query("SELECT * from question where question_id = ?",[
            data.question_id
        ],(err,results,fields)=>{
            if(err){
                console.log(err);
            }else{
                //console.log()
                likes(results[0].likes);
            }
        })
    },
    likedQuestion : (data,callBack) => {

        function getOptions(question_id) {
            return new Promise((resolve, reject) => {
              pool.query(
                "SELECT * FROM `option` WHERE question_id = ?",
                [question_id],
                (err, result) => {
                  return err ? reject(err) : resolve(result);
                }
              );
            });
          }

       // console.log(data)
        pool.query("SELECT * from question_like INNER JOIN question ON question_like.question_id = question.question_id where user_id = ? AND question_like.topic_id=?",
                [
                    data.user_id,
                    data.topic_id
                ],async (err,results,fields) => {
            if(err){
                return callBack(err)
            }else{
                for (let i = 0; i < results.length; i++) {
                    results[i]['option'] = await getOptions(results[i].question_id);
                }
                return callBack(null,results);
            }
        })
    },
    Result: (data,callBack) => {
        pool.query("SELECT count(*) as attempted,(select count(*) from response where answerstatus=1 AND topic_id=? AND user_id=?) as RightQuestion,(select count(*) from response where response='answered' AND answerstatus=0 AND topic_id=? AND user_id=?) as WrongQuestion,(select count(*) from response where response='skipped' AND answerstatus=0 AND topic_id=? AND user_id=?) as Skipped,(select count(*) from response where response='dontKnow' AND answerstatus=0 AND topic_id=? AND user_id=?) as DontKnow from response where topic_id=? AND user_id=?",
        [
            data.topic_id,
            data.user_id,
            data.topic_id,
            data.user_id,
            data.topic_id,
            data.user_id,
            data.topic_id,
            data.user_id,
            data.topic_id,
            data.user_id
        ],
        (err,results,fields)=>{
            if(err){
                console.log(err);
                callBack(err)
            }else{
                callBack(null,results)
            }
        })
    },
    statics:(data,callBack)=>{
        function getResult(topic_id) {
            return new Promise((resolve, reject) => {
                pool.query("SELECT count(question_id) as attempted,(select count(*) from response where answerstatus=1 AND topic_id=? AND user_id=?) as RightQuestion,(select count(*) from response where response='answered' AND answerstatus=0 AND topic_id=? AND user_id=?) as WrongQuestion,(select count(*) from response where response='skipped' AND answerstatus=0 AND topic_id=? AND user_id=?) as Skipped,(select count(*) from response where response='dontKnow' AND answerstatus=0 AND topic_id=? AND user_id=?) as DontKnow from response where topic_id=? AND user_id=?",
                    [
                        topic_id,
                        data.user_id,
                        topic_id,
                        data.user_id,
                        topic_id,
                        data.user_id,
                        topic_id,
                        data.user_id,
                        topic_id,
                        data.user_id
                    ],
                    ((err, result) => {
                        return err ? reject(err) : resolve(result);
                    })
                )
            });
        }


        function getTopic(class_id){
            return new Promise((resolve, reject) => {
                pool.query("SELECT * FROM topics where class_id=?",
                    [
                        class_id
                    ],
                    (async (err, result) => {
                        if(err){
                            reject(err) 
                        }else{
                            for (let i = 0; i < result.length; i++) {
                                
                                const resultdata = await getResult(result[i].topic_id)
                                result[i]['result'] = resultdata;
                                
                            }
                            resolve(result);
                        }
                        
                    })
                )
            });
        }

        pool.query("SELECT * FROM class",[],async (err,results,fields)=>{
            if(err){
                return callBack(err)
            }else{
                for (let i = 0; i < results.length; i++) {
                    results[i]['topic_result'] = await getTopic(results[i].class_id);
                }
                return callBack(null,results);
            }
        })
    },
    deleteQuestion:(data,callBack)=>{
        pool.query("DELETE from question where question_id=?",[
            data.question_id
        ],
        (error,results,fields)=>{
            if(error){
               return callBack(error)
            }
            return callBack(null,results)
        })
    },
    setAnswer:(data,callBack)=>{
        pool.query("UPDATE question set answer=? where question_id=?",[
            data.answer,
            data.question_id
        ],
        (error,results,fields)=>{
            if(error){
                
               return callBack(error)
            }
            return callBack(null,results)
        })
    },
    lastAnswered:(data,callBack)=>{
        pool.query("SELECT * from response where topic_id=? AND user_id=? ORDER BY resp_id DESC LIMIT 1",[
            data.topic_id,
            data.user_id
        ],(error,results,fields)=>{
            if(error){
                
                return callBack(error)
             }
             return callBack(null,results[0])
        })
    }
    
}