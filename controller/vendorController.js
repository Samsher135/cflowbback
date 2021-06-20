const {
    jsonResponse
} = require("./commonController");
const vendorModule = require('../module/vendor');
const vendor = new vendorModule();
const productModule = require('../module/product');
const product = new productModule();


module.exports = {

    add_service: async (req, res) => {
        try {
            console.log(req.body)
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let exists=await Promise.all([vendor.service_exist(req)]);
            console.log(exists,"exists")
            let info
            let type_arr
            type_arr= new Set()
            let brand_arr= new Set()
            let size_arr= new Set()
            let grade_arr= new Set()
            if(exists[0]?.length >0){
                info=JSON.parse(exists[0][0]?.info)
                console.log(exists[0][0]?.info)
                info?.type && info?.type?.map((info)=>type_arr.add(info))
                info?.brand && info?.brand?.map((info)=>brand_arr.add(info))
                info?.size && info?.size?.map((info)=>size_arr.add(info))
                info?.grade && info?.grade?.map((info)=>grade_arr.add(info))
            }
       
           
            
            req.body.info?.type && req.body.info?.type?.map((info)=>type_arr.add(info))
            req.body.info?.brand && req.body.info?.brand?.map((info)=>brand_arr.add(info))
            req.body.info?.size && req.body.info?.size?.map((info)=>size_arr.add(info))
            req.body.info?.grade && req.body.info?.size?.map((info)=>grade_arr.add(info))
            
            
    
            
            const arr1={type:[...type_arr] ,brand:[...brand_arr],size:[...size_arr],grade:[...grade_arr]}
            
            
        
            if(exists[0]?.length >0){
                console.log("exist ke andar")
                console.log(req.body.type,req.body.id,arr1)
                let [results] = await Promise.all([vendor.update_service1(req,arr1)])
                jsonResponse(res, "sucess",results)
            }
            else{
                console.log("exist ke else me")
                console.log(req.body.type,req.body.id)
                let [results] = await Promise.all([vendor.add_service(req)])
                jsonResponse(res, "sucess",results)
            }
            
        
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    delete_service: async (req, res) => {
        try {
            console.log(req.body)
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let exists=await Promise.all([vendor.service_exist(req)]);
            
            const info1=JSON.parse(exists[0][0]?.info)

            let type_arr
            type_arr= new Set()
            let brand_arr= new Set()
            let size_arr= new Set()
            let grade_arr= new Set()
            info1?.type && info1?.type?.map((info2)=>arr.add(info2))
            info1?.brand && info1?.brand?.map((info2)=>brand_arr.add(info2))
            info1?.size && info1?.size?.map((info2)=>size_arr.add(info2))
            info1?.grade && info1?.grade?.map((info2)=>grade_arr.add(info2))
    
            
            req.body.info?.type && req.body.info?.type?.map((info)=>type_arr.delete(info))
            req.body.info?.brand && req.body.info?.brand?.map((info)=>brand_arr.delete(info))
            req.body.info?.size && req.body.info?.size?.map((info)=>size_arr.delete(info))
            req.body.info?.grade && req.body.info?.size?.map((info)=>grade_arr.delete(info))
            

     
            const arr1={type:[...type_arr] ,brand:[...brand_arr],size:[...size_arr],grade:[...grade_arr]}
            if(arr1.type?.length ===0 && arr1.brand?.length ===0 && arr1.size?.length ===0 && arr1.grade?.length ===0){
                let [resulst1]= await Promise.all([vendor.delete_service(req)])
                jsonResponse(res, "sucess",results1)
            }
            else{
                let [results] = await Promise.all([vendor.update_service1(req,arr1)])
                jsonResponse(res, "sucess",results)
            }
   
            
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    get_services: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([vendor.get_services(req)])
            for(var i=0;i<results.length;i++){
                
                if(results[i].info) results[i].info=JSON.parse(results[i].info)
                
                
            }
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    get_services_by_filter: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([vendor.get_services_by_filter(req)])
            for(var i=0;i<results.length;i++){
                
                if(results[i].materials) results[i].materials=JSON.parse(results[i].materials)
                if(results[i].agents) results[i].agents=JSON.parse(results[i].agents)
                if(results[i].vehicles) results[i].vehicles=JSON.parse(results[i].vehicles)
                if(results[i].machines) results[i].machines=JSON.parse(results[i].machines)
                if(results[i].chemicals) results[i].chemicals=JSON.parse(results[i].chemicals)
                // console.log(results[i].materials,i)
                // console.log(results[i].agents,i)
            }
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },

    new_leads: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [products] = await Promise.all([vendor.products(req)])
            let [vendors]= await Promise.all([product.vendor()])
            // console.log(products, 'products')
            if(products.length > 0){
              
                let results;
                
                [results] = await Promise.all([vendor.new_leads(req,products,vendors)])
                console.log(results,"resulstdfjndgfbzljxfnpeqbgahobgfjgfnsprgjpew")
                // console.log(results, 'products')
                jsonResponse(res, "sucess",results)
            }
            else jsonResponse(res, "Please add some services you provide in services section to see new requests")
            
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },

    get_pending_leads: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;

            if(req.body.type){
                var arr=[]
                for(var i=0; i<req.body.type.length; i++){
                    console.log(req.body.type[i])
                    let [results] = await Promise.all([vendor.get_pending_leads_by_type(req,req.body.type[i])])
                    arr.push(results)
                }
                jsonResponse(res, "sucess",arr)
                // jsonResponse(res, "sucess")
            }
            else{
                let [results] = await Promise.all([vendor.get_pending_leads(req)])
                jsonResponse(res, "sucess",results)
            }



            
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },

    get_saved_leads: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([vendor.get_saved_leads(req)])
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },

    products: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([vendor.products(req)])
            console.log(results)
            let arr=[]
            for (let i = 0; i <results.length; i++){
                arr.push(results[i].type)
            }
            jsonResponse(res, "sucess",arr)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    total_services: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([vendor.total_services(req)])
            
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    maximum_sales_vendor: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([vendor.maximum_sales_vendor(req)])
            
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    most_requested_service: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([vendor.most_requested_service(req)])
            
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    sales_vendor: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            console.log(req.body.id)
            let [results] = await Promise.all([vendor.sales_vendor(req)])
            console.log(results)
            
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },

    vendor_contribution: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            console.log(req.body.id)
            let [results1]=await Promise.all([vendor.no_of_total_sales(req)])
            let [results] = await Promise.all([vendor.vendor_contribution(req)])
            console.log(results[0].count,results1[0].count)
            let percentage=((results[0].count)*100)/results1[0].count
            console.log(typeof percentage)
            
            jsonResponse(res, "sucess",`${percentage}%`)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },

    vendor_pitched: async (req, res) => {
        try {
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            console.log(req.body,"pitched")
            let [results] = await Promise.all([vendor.vendor_pitched(req)])
            
            
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },

    vendor_rejected: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            
            let [results] = await Promise.all([vendor.vendor_rejected(req)])
            
            
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },

    vendor_month_sale :async(req,res)=>{
        try{
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [result]= await Promise.all([vendor.vendor_month_sale(req)])
            
            let month_sale={acceptedPitch:"",rejectedPitch:"",pitched:""}
            for(var i=0;i<result?.length;i++){
                if(result[i].product_status==="acceptedPitch"){
                    month_sale.acceptedPitch=result[i]?.count;
                }
                else if(result[i].product_status==="rejectedPitch"){
                    month_sale.rejectedPitch=result[i]?.count;
                }
                else {
                    month_sale.pitched=result[i]?.count;
                }
            }
            console.log("month_sale",month_sale)
            jsonResponse(res, "sucess",month_sale)

        }
        catch(error){
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },
    vendor_sale_percentage :async(req,res)=>{
        try{
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let percentage=await Promise.all([vendor.vendor_month_percentage(req)])
            jsonResponse(res, "sucess",percentage)

        }
        catch(error){
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },
    most_sold_product :async(req,res)=>{
        try{
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results]=await Promise.all([vendor.most_sold_product(req)])
            console.log(results[0],"results")
            let data;
            let count;
            let results1;
            if(results[0])
            {
                data=JSON.parse(results[0]?.data)
                count=results[0]?.count
                results1=results[0]?.type
            }
            else
            {
                data="No Products Sold"
                count=0
                results1=""
            }
            jsonResponse(res, "sucess",{results1,data,count})

        }
        catch(error){
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },
    get_price_detail:async(req,res)=>{
        try{
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results]=await Promise.all([vendor.get_price_detail(req)])
            jsonResponse(res, "sucess",results)
        }
        catch(error){
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },
}