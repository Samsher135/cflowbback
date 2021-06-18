const {
    jsonResponse
} = require("./commonController");
const productModule = require('../module/product');
const notificationModule = require('../module/notification');
const product = new productModule();
const notification= new notificationModule();
let noti=[]


module.exports = {

    pinned_notification:async(req,res)=>{
        try{
            // console.log(req.body,'inside notification')
            let id= req.body.id
            let details=req.body.detail
            let [results1]=await Promise.all([notification.getnotification1(id)])
            // console.log(results1)
            if(results1[0].pinned==null){
                noti.push(details)
                let [results] = await Promise.all([notification.setnotification1(id,noti)])
                jsonResponse(res, "sucess",results)
            }
            else{
                noti=JSON.parse(results1[0].pinned)
                // console.log(req.body.detail)
                noti.push(details)
            }

        }
        catch(error){
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },

    all_notification:async(req,res)=>{
        try {
            let id =req.params.user_id
            let[results]=await Promise.all([notification.all_notification(id)])
            let results1=JSON.parse(results[0]?.details)
            jsonResponse(res, "all",results1)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },


    insert_product: async (req, res) => {
        try {
            // req.body.name= "product111"
            // console.log(req.body,"HIII")
            let [results] = await Promise.all([product.insert_product(req)])
            jsonResponse(res, "product inserted", results)
        
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    
    maximum_sales: async (req, res) => {
        try {
            // console.log(req.body,"body")
            let [results] = await Promise.all([product.maximum_sales(req)])
            // console.log(results)
            jsonResponse(res, "sucess", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    no_of_requests: async (req, res) => {
        try {
            // console.log(req.body,"body")
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            
            let [results] = await Promise.all([product.no_of_requests(req)])
            // console.log(results)
            jsonResponse(res, "sucess", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },

    // vendor_product_status_changed: async (req, res) => {
    //     try {
    
    //         req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
    //         let [results] = await Promise.all([product.vendor_product_status_changed(req)])
    //         console.log(results)
    //         jsonResponse(res, "sucess", results)
    //     } catch (error) {
    //         console.log(error);
    //         jsonResponse(res, "error", error);
    //     };
    // },
    pitched_requests: async (req, res) => {
        try {

            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            // console.log(req.body.id,"pitched")
            let arr1=[];
    
            // let [results] = await Promise.all([product.get_product_id(req)])
            let arr=[];
            // for(var i=0;i<results.length;i++){
              
                let [results1] = await Promise.all([product.pitched_requests(req.body.id)])
                // arr.push(results1)
            // }
            // console.log(arr)
            // if(arr1){
            //     for(var i=0;i<arr1.length;i++){
                
            //         for(var k=0;k<arr1[i].length;k++){
            //             let [results1] = await Promise.all([product.pitched_requests(arr1[i][k].id)])
            //         if(results1.length){
            //             arr.push({"results1":results1,"productinfo":arr1[i][k]})
            //             // console.log(results1,"r")
            //             }
            //         }   
            //     }
            // }
            // console.log(arr)
            
            jsonResponse(res, "sucess", results1)
            
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    new_requests: async (req, res) => {
        try {
            
            // console.log(req.body.type)

            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            console.log(req.body,"new_request")
           
            let [vendor]= await Promise.all([product.vendor()])
          
            
            let results;
        
                [results] = await Promise.all([product.new_requests(req.body.id,vendor)]);
            
            
            
            console.log(results,"HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
                jsonResponse(res, "sucess",results)
            // jsonResponse(res, "sucess")
            
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },

    saved_requests: async (req, res) => {
        try {
    
            // console.log(req.body.type)

            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;

            let [results1] = await Promise.all([product.saved_requests(req.body.id)])
         
            jsonResponse(res, "sucess", results1)
            
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    request_service: async (req, res) => {
        try {
            // req.body.name= "product111"
            console.log(req.body,"HIII")
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
     
            var delivery_address = JSON.stringify(req.body.delivery_address);
            console.log(delivery_address)
            
            // console.log(JSON.stringify(req.body.brands))
            let [results] = await Promise.all([product.request_service(req,delivery_address)]);
            jsonResponse(res, "request inserted in product table", results)
        
        } catch (error) {
            console.log('HEllo') //By Akhtar
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },  // Akhtar
    

}