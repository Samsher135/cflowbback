// const mysqli = require('./mysqli');
const mysqli = require('./product_mysqli');
const mysqliClass = new mysqli();
const notificationModule = require('./notification');
const notification= new notificationModule();


class Product {
    constructor() {}

    async insert_product(req) {
        let mysql = {};
        let escape_data = [req.body.name, req.body.type];
        let strQuery = await mysqliClass.mysqli(mysql, 'insert_product');
        return await global.mysql.query(strQuery, escape_data);
    }
    async maximum_sales(req) {
        let mysql = {};
        let status='accepted'
        let escape_data = [status];
        let strQuery = await mysqliClass.mysqli(mysql, 'maximum_sales');
        return await global.mysql.query(strQuery, escape_data);
    }
    async no_of_requests(req) {
        let mysql = {};
        let escape_data = [req.body.id,req.body.status];
        let strQuery = await mysqliClass.mysqli(mysql, 'no_of_requests');
        return await global.mysql.query(strQuery, escape_data);
    }

    async pitched_requests(id) {
        let mysql = {};
        let escape_data = [id,"pitched","acceptedPitch","rejectedPitch"];
        let strQuery = await mysqliClass.mysqli(mysql, 'pitched_requests');

        return await global.mysql.query(strQuery, escape_data);
    }

    async new_requests(req) {
        let mysql = {};
        
        let escape_data = [req,"pending"];
        // console.log(escape_data)
        let strQuery = await mysqliClass.mysqli(mysql, 'new_requests');
        // console.log(strQuery);
        return await global.mysql.query(strQuery, escape_data);
    }
    
    async saved_requests(req) {
        let mysql = {};
        
        let escape_data = [req,"acceptedPitch","rejectedPitch"];
        let strQuery = await mysqliClass.mysqli(mysql, 'saved_requests');

        return await global.mysql.query(strQuery, escape_data);
    }
    async request_service(req,delivery_address) {
        let mysql = {};
        
        // let escape_data = [JSON.parse(req.body.id),req.body.service_type,req.body.type, req.body.quantity, JSON.stringify(req.body.data),"pending",req.body.urgent,req.body.delivery_address,req.body.deliver_by];
        let escape_data = [req.body.id,req.body.service_type,req.body.type, req.body.quantity,"pending",req.body.urgent,req.body.deliver_by,delivery_address,JSON.stringify(req.body.data)];
        console.log(escape_data,"escape_data")
        
        let a= req.body.type;
        let b=await mysqliClass.mysqli(mysql, 'vendor_id');
        let c= await  global.mysql.query(b, a);
        // let details={name:"new request"}
        console.log(c,'vendor_id')
        let details={title:"New Request",value:a,link:"123.www"}
        c.map(async (id)=>{
            console.log(id.vendor_id)
            await notification.getnotification(id.vendor_id,details)
        })
        await notification.get_user('vendor',details)
        let strQuery = await mysqliClass.mysqli(mysql, 'request_service');
        return await global.mysql.query(strQuery, escape_data);
    } 
    
}

module.exports = Product;