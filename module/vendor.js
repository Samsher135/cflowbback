
const mysqli = require('./vendor_mysqli');
const mysqliClass = new mysqli();
const notificationModule = require('./notification');
const notification= new notificationModule();


class Vendor {
    constructor() {}
    async vendor_contribution(req) {
        let mysql = {};
        let escape_data;
    
        escape_data =["accepted",req.body.id]
        let strQuery = await mysqliClass.mysqli(mysql, 'vendor_contribution');
        return await global.mysql.query(strQuery, escape_data);
 
    }
    async add_service(req) {
        let mysql = {};
        let escape_data;
        
        escape_data =[req.body.id,req.body.service_type,req.body.type,JSON.stringify(req.body.info)]
        let strQuery = await mysqliClass.mysqli(mysql, 'add_service');
        return await global.mysql.query(strQuery, escape_data);
        


        // escape_data=[req.body.id]
        
    }
    async update_service(req) {
        let mysql = {};
        let escape_data;

      
        escape_data =[JSON.stringify(req.body.info),req.body.id,req.body.type]
        let strQuery = await mysqliClass.mysqli(mysql, 'update_service');
        return await global.mysql.query(strQuery, escape_data);
        
        // escape_data=[req.body.id]
        
    }
    async get_services(req) {
        let mysql = {};
        let escape_data;
    
        escape_data =[req.body.id]
        let strQuery = await mysqliClass.mysqli(mysql, 'get_services');
        return await global.mysql.query(strQuery, escape_data);
        

        // escape_data=[req.body.id]
        
    }
    async get_services_by_filter(req) {
        let mysql = {};
        let escape_data;
    
        escape_data =[req.body.id,req.body.type]
        let strQuery = await mysqliClass.mysqli(mysql, 'get_services_by_filter');
        return await global.mysql.query(strQuery, escape_data);
        

        // escape_data=[req.body.id]
        
    }

    async new_leads(req,products) {
        let mysql = {};
        let escape_data;
        
        let type=products.map((product)=>{
            
            return product.type
        })
        
        escape_data =[req.body.id,type,"pending"]
        console.log(escape_data,"escape")
        let strQuery = await mysqliClass.mysqli(mysql, 'new_leads');
        return await global.mysql.query(strQuery, escape_data);
        

        // escape_data=[req.body.id]
        
    }

    async get_pending_leads(req) {
        let mysql = {};
        let escape_data;
    
        escape_data =[req.body.id,"pitched"]
        let strQuery = await mysqliClass.mysqli(mysql, 'get_pending_leads');
        return await global.mysql.query(strQuery, escape_data);
        

        // escape_data=[req.body.id]
        
    }

    async get_pending_leads_by_type(req,type) {
        let mysql = {};
        let escape_data;
    
        escape_data =[req.body.id,"pitched",type]
        let strQuery = await mysqliClass.mysqli(mysql, 'get_pending_leads_by_type');
        return await global.mysql.query(strQuery, escape_data);
        

        // escape_data=[req.body.id]
        
    }


    async get_saved_leads(req) {
        let mysql = {};
        let escape_data;
    
        escape_data =[req.body.id,"acceptedPitch","rejectedPitch"]
        let strQuery = await mysqliClass.mysqli(mysql, 'get_saved_leads');
        return await global.mysql.query(strQuery, escape_data);
        

        // escape_data=[req.body.id]
        
    }

    async products(req) {
        let mysql = {};
        let escape_data;
    
        escape_data =[req.body.id]
        let strQuery = await mysqliClass.mysqli(mysql, 'products');
        return await global.mysql.query(strQuery, escape_data);
        

        // escape_data=[req.body.id]
        
    }
    async total_services(req) {
        let mysql = {};
        let escape_data;
    
        escape_data =[req.body.id]
        let strQuery = await mysqliClass.mysqli(mysql, 'total_services');
        return await global.mysql.query(strQuery, escape_data);
        

        // escape_data=[req.body.id]
        
    }
    async maximum_sales_vendor(req) {
        let mysql = {};
        let escape_data;
    
        escape_data =[req.body.id]
        let strQuery = await mysqliClass.mysqli(mysql, 'maximum_sales_vendor');
        return await global.mysql.query(strQuery, escape_data);
        

        // escape_data=[req.body.id]
        
    }
    async most_requested_service(req) {
        let mysql = {};
        let escape_data;
    
        escape_data =[req.body.id]
        let strQuery = await mysqliClass.mysqli(mysql, 'most_requested_service');
        return await global.mysql.query(strQuery, escape_data);
        

        // escape_data=[req.body.id]
        
    }
    async sales_vendor(req) {
        let mysql = {};
        let escape_data;
    
        escape_data =[req.body.id,"accepted","rejected"]
        let strQuery = await mysqliClass.mysqli(mysql, 'sales_vendor');
        return await global.mysql.query(strQuery, escape_data);
 
    }

    async no_of_total_sales(req) {
        let mysql = {};
        let escape_data;
    
        escape_data =["accepted"]
        let strQuery = await mysqliClass.mysqli(mysql, 'no_of_total_sales');
        return await global.mysql.query(strQuery, escape_data);
    }

    async vendor_pitched(req) {
        let mysql = {};
        let escape_data;
        console.log('inside vendor_pitch')
        escape_data =[req.body.Pid,req.body.id,req.body.pitch_value,"pitched"]
        let a = req.body.Pid;
        let b= await mysqliClass.mysqli(mysql,'get_user_id');
        let c=await global.mysql.query(b,a);
        let detail={Title:"new lead",value:req.body.pitch_value,link:'localhost???'}
        let userid=c[0].user_id;
        console.log(c)
        await notification.getnotification(userid,detail)

        let strQuery = await mysqliClass.mysqli(mysql, 'vendor_pitched');
        return await global.mysql.query(strQuery, escape_data);
    }
    async vendor_rejected(req) {
        let mysql = {};
        let escape_data;
    
        escape_data =[req.body.Pid,req.body.id,"rejected"]
        let strQuery = await mysqliClass.mysqli(mysql, 'vendor_rejected');
        return await global.mysql.query(strQuery, escape_data);
    }
    
    async vendor_month_sale(req){
        let mysql={};
        let end_day='31';
        let start_day='1';
        var myVariable = new Date();
        var makeDate = new Date(myVariable);
        makeDate.setMonth(makeDate.getMonth() - 1);
        let nv= makeDate.toISOString();
        let end_date= nv.slice(0,8)+"31";
        let start_date= nv.slice(0,8)+"01";
        // let escape_data=[req.body.id,start_date,end_date,"accepted"];
        let escape_data=[req.body.id,"accepted"];
        let strQuery = await mysqliClass.mysqli(mysql, 'vendor_month_sale');
         return await global.mysql.query(strQuery, escape_data);        
        
    }
}


module.exports = Vendor;