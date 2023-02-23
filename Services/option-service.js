const pool = require("../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            "insert into `option`(`question_id`, `option`, time) values(?,?,?)",
            [
                data.question_id,
                data.option,
                Math.round(+new Date()/1000)
            ],
            (error,results,fields) => {
                if(error){
                    callBack(error);
                }
                return callBack(null,results);
            }
            )
    },

    optionList: (data, callBack) => {

        pool.query("SELECT * FROM `option` JOIN question ON `option`.question_id=question.question_id where `option`.question_id=?",[
            data.question_id
        ],
        (error,results,fields) => {
            if(error){
                callBack(error);
            }
            return callBack(null,results);
        }
        )
    },
    deleteOption:(data,callBack)=>{
        pool.query("DELETE from `option` where option_id=?",
        [
            data.option_id
        ],
        (error,results,fields)=>{
            if(error){
                callBack(error);
            }
            return callBack(null,results);
        })
    }

}