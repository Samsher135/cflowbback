
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
        let price_detail = JSON.stringify(req.body.price_detail)
        escape_data =[req.body.Pid,req.body.id,req.body.pitch_value,price_detail,"pitched"]
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
        makeDate.setMonth(makeDate.getMonth());
        let nv= makeDate.toISOString();
        let end_date= nv.slice(0,8)+"31";
        let start_date= nv.slice(0,8)+"01";
        let escape_data=[req.body.id,"accepted","rejected",start_date,end_date];
        
        let strQuery = await mysqliClass.mysqli(mysql, 'vendor_month_sale');
         return await global.mysql.query(strQuery, escape_data);        
        
    }
    async vendor_month_percentage(req){
        let mysql={};
        let end_day='31';
        let start_day='1';
        var myVariable = new Date();
        var makeDate = new Date(myVariable);

        makeDate.setMonth(makeDate.getMonth()-1);
        let nv= makeDate.toISOString();
        let prev_end_date= nv.slice(0,8)+"31";
        let prev_start_date= nv.slice(0,8)+"01";

        makeDate.setMonth(makeDate.getMonth()+1);
        let nv1= makeDate.toISOString();
        let curr_end_date= nv1.slice(0,8)+"31";
        let curr_start_date= nv1.slice(0,8)+"01";
        

        let escape_data=[req.body.id,prev_start_date,prev_end_date];
        let strQuery= await mysqliClass.mysqli(mysql, 'prev_month_sale');

        let escape_data1=[req.body.id,curr_start_date,curr_end_date];
        let strQuery1 = await mysqliClass.mysqli(mysql, 'current_month_sale');
        
        let prev_month= await global.mysql.query(strQuery, escape_data);        
        let current_month=await global.mysql.query(strQuery1,escape_data1);

        console.log(prev_month[0].prevMonth,current_month[0].currmonth);
        if(prev_month[0].prevMonth===0){
            console.log(current_month[0].currmonth)
        }
        else{
            let percentage= ((current_month[0].currmonth-prev_month[0].prevMonth)/prev_month[0].prevMonth)*100;
            console.log('sale increased by',percentage,"%")
            return percentage;
        }
    }
    async most_sold_product(req) {
        let mysql = {};
        let escape_data;
        let end_day='31';
        let start_day='1';
        var myVariable = new Date();
        var makeDate = new Date(myVariable);
        makeDate.setMonth(makeDate.getMonth());
        let nv= makeDate.toISOString();
        let end_date= nv.slice(0,8)+"31";
        let start_date= nv.slice(0,8)+"01";
    
        escape_data =[req.body.id,start_date,end_date]
        let strQuery = await mysqliClass.mysqli(mysql, 'most_sold_product');
        return await global.mysql.query(strQuery, escape_data);
    }
    async get_price_detail(req) {
        let mysql = {};
        let escape_data;
        escape_data =[req.body.id,req.body.productId]
        let strQuery = await mysqliClass.mysqli(mysql, 'get_price_detail');
        return await global.mysql.query(strQuery, escape_data);
    }
}


module.exports = Vendor;