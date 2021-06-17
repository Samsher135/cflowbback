const mysqli = require('./notification_mysqli');
const mysqliClass = new mysqli();
let notification_arr=[];

class Notification {
    constructor() {}

    async find_user(id){
        let mysql={};
        let escape_data=[id];
        let strQuery = await mysqliClass.mysqli(mysql, 'find_user');
        return await global.mysql.query(strQuery, escape_data);
    }

    async create_user(id,type){
        let mysql={};
        console.log('inside create user',id,type)
        let escape_data=[id,type];
        console.log("inside create_user")
        let strQuery = await mysqliClass.mysqli(mysql, 'create_user');
        return await global.mysql.query(strQuery, escape_data);
 

    }
    
    async setnotification1(id,arr){
        let mysql={};
        let escape_data=[JSON.stringify(arr),id];
        let strQuery = await mysqliClass.mysqli(mysql, 'notification_set1');
        return await global.mysql.query(strQuery, escape_data);
    }

    async getnotification1(id){
        let mysql={}
        let escape_data=[id];
        let strQuery=await mysqliClass.mysqli(mysql,'get_notification1')
        return await global.mysql.query(strQuery,escape_data);

    }


    async setnotification(userid,arr){
        let mysql={};
        let escape_data=[JSON.stringify(arr),userid];
        let strQuery = await mysqliClass.mysqli(mysql, 'notification_set');
        return await global.mysql.query(strQuery, escape_data);
    }
    
    async getnotification(userid,detail){
        console.log('inside getnotification',detail,userid)
        let mysql={}
        let escape_data=[userid];
        let strQuery=await mysqliClass.mysqli(mysql,'get_notification')
        let results1= await global.mysql.query(strQuery,escape_data);
        console.log(results1[0].details)
        if(results1[0].details==null){
            console.log('details',detail)
            notification_arr.push(detail)
            this.setnotification(userid,notification_arr)
        }
        else{
            notification_arr=(JSON.parse(results1[0]?.details));
            notification_arr?.push(detail)
            this.setnotification(userid,notification_arr)
        }

    }
    async all_notification(id){
        let mysql={}
        console.log(id,'module')
        let escape_data=[id];
        let strQuery=await mysqliClass.mysqli(mysql,'all_notification')
        return await global.mysql.query(strQuery,escape_data);

    }


//for super admin

    async set_user(type,arr){
        let mysql={};
        let escape_data=[JSON.stringify(arr),type];
        let strQuery = await mysqliClass.mysqli(mysql, 'notification_set');
        return await global.mysql.query(strQuery, escape_data);
    }

    async get_user(type,detail){
        console.log('inside getnotification',detail,type)
        let mysql={}
        let escape_data=[type];
        let strQuery=await mysqliClass.mysqli(mysql,'get_notification')
        let results1= await global.mysql.query(strQuery,escape_data);
        console.log(results1[0]?.details)
        if(results1[0]?.details==null){
            console.log('details',detail)
            notification_arr.push(detail)
            this.setnotification(type,notification_arr)
        }
        else{
            notification_arr=(JSON.parse(results1[0]?.details));
            notification_arr.push(detail)
            this.setnotification(type,notification_arr)
        }

    }


}


module.exports = Notification;
