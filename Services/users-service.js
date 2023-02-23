
const pool = require("../config/database");
var base64ToImage = require('base64-to-image');
var im = '/images/';

module.exports = {
    create: (data, callBack) => {
        pool.query(
            "insert into users(name, email, password,time,image) value(?,?,?,?,?)",
            [
                data.name,
                data.email,
                data.password,
                Math.floor(Date.now() /1000),
                im
            ],
            (error,results,fields) => {
                if(error){
                    callBack(error);
                }
                return callBack(null,results);
            }
            )
    },

    userList: (callBack) => {
        pool.query("SELECT * FROM users",[],
        (error,results,fields) => {
            if(error){
                callBack(error);
            }
            return callBack(null,results);
        }
        )
    },
    userById: (data,callBack) => {
        pool.query("SELECT * FROM users where user_id = ?",[data.user_id],
            (error,results,fields)=>{
                if(error){
                    callBack(error);
                }
                return callBack(null,results[0]);
            }
        )
    },

    updateUser : (data,callBack) => {


        if(data.image.length > 10){
        var base64Str = data.image;
        var path ='./public/images/';
        const imageName = Date.now() + '.png';
        var optionalObj = {'fileName': imageName, 'type':'png'};
        var imageInfo = base64ToImage(base64Str,path,optionalObj); 
        data.image =  '/images/' + imageInfo.fileName;
        pool.query("UPDATE users SET name = ?,image= ? WHERE user_id = ?", [data.name,data.image,data.user_id],
            (error,results,fields)=>{
                if(error){
                    callBack(error);
                }else{
                    pool.query("SELECT * from users where user_id = ?",[
                        data.user_id
                    ],(error,rows,fileds)=>{
                        if(error){
                            return callBack(error);
                        }else{
                            return callBack(null,rows[0]);
                        }
                    })
                }
            })
        }else{
            
        pool.query("UPDATE users SET name = ? WHERE user_id = ?", [data.name,data.user_id],
            (error,results,fields)=>{
                if(error){
                    callBack(error);
                }else{
                    pool.query("SELECT * from users where user_id = ?",[
                        data.user_id
                    ],(error,rows,fileds)=>{
                        if(error){
                            return callBack(error);
                        }else{
                            return callBack(null,rows[0]);
                        }
                    })
                }
            })
        }
        
    },
    getUserByEmail: (data,callBack)=>{
        pool.query("SELECT * from users where email = ?",
        [
            data.email
        ],
        (error,results,fields)=>{
            if(error){
                callBack(error);
            }
            return callBack(null,results[0]);
        }
        )
    },
    subscription:(data,callBack)=>{
        pool.query("INSERT INTO subscription(user_id,transaction,status,start_time,end_time) VALUES(?,?,?,?,?)",
        [
        data.user_id,
        data.transaction,
        data.status,
        Math.floor(Date.now() /1000),
        Math.floor(Date.now() /1000)+2592000,
        ],(error,results,fields)=>{
            if(error){
                callBack(error);
            }
            return callBack(null,results);
        })
    },
    subscriptionDetail:(data,callBack)=>{
        pool.query("select * from subscription where user_id=? ORDER BY subscription_id DESC LIMIT 1",
        [
            data.user_id    
        ],(error,results,fields)=>{
            if(error){
                callBack(error);
            }
            return callBack(null,results);
        })
    }
};