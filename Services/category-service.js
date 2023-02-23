const pool = require("../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            "insert into category(name, topic_id, description,time) values(?,?,?,?)",
            [
                data.name,
                data.topic_id,
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
    getCategory: (data,callBack)=>{
        pool.query("SELECT * from category where topic_id = ?",
        [
            data.topic_id
        ],
        (error,results,fields)=>{
            if(error){
                callBack(error);
            }
            return callBack(null,results);
        }
        )
    }
    
}