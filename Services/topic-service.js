const pool = require("../config/database");
var base64ToImage = require('base64-to-image');

module.exports = {
    create: (data, callBack) => {


        var base64Str = data.image;
        var path ='./public/topics/';
        const imageName = Date.now() + '.png';
        var optionalObj = {'fileName': imageName, 'type':'png'};
        var imageInfo = base64ToImage(base64Str,path,optionalObj); 
        data.image =  '/topics/' + imageInfo.fileName;

        pool.query(
            "insert into topics(name,image,class_id,description,time) values(?,?,?,?,?)",
            [
                data.name,
                data.image,
                data.class_id,
                data.description,
                Math.floor(Date.now() /1000)
            ],
            (error,results,fields) => {
                if(error){
                    callBack(error);
                }
                return callBack(null,results);
            }
            )
    },
    getTopic: (data,callBack)=>{
        pool.query("SELECT * from topics where class_id = ?",
        [
            data.class_id
        ],
        (error,results,fields)=>{
            if(error){
                callBack(error);
            }
            return callBack(null,results);
        }
        )
    },
    removeTopic:(data,callBack)=>{
        pool.query("DELETE from topics where topic_id=?",[
            data.topic_id
        ],
        (error,results,fields)=>{
            if(error){
               return callBack(error)
            }
            return callBack(null,results)
        })
    }
    
}