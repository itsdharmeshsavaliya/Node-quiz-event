const pool = require("../config/database");
var base64ToImage = require('base64-to-image');
module.exports = {
    create: (data, callBack) => {
        var base64Str = data.image;
        var path ='./public/class/';
        const imageName = Date.now() + '.png';
        var optionalObj = {'fileName': imageName, 'type':'png'};
        var imageInfo = base64ToImage(base64Str,path,optionalObj); 
        data.image =  '/class/' + imageInfo.fileName;
        pool.query(
            "insert into class(name,image, description,color, status) values(?,?,?,?,?)",
            [
                data.name,
                data.image,
                data.description,
                data.color,
                'active'
            ],
            (error,results,fields) => {
                if(error){
                    callBack(error);
                }
                return callBack(null,results);
            }
            )
    },

    classList: (callBack) => {
        pool.query("SELECT * FROM class ORDER BY class_id DESC",[],
        (error,results,fields) => {
            if(error){
                callBack(error);
            }
            return callBack(null,results);
        }
        )
    },
    removeClass:(data,callBack)=>{
        pool.query("DELETE from class where class_id=?",[
            data.class_id
        ],
        (error,results,fields)=>{
            if(error){
                callBack(error);
            }
            return callBack(null,results);
        })
    }

}