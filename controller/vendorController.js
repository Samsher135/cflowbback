const {
    jsonResponse
} = require("./commonController");
const vendorModule = require('../module/vendor');
const vendor = new vendorModule();


module.exports = {

    add_service: async (req, res) => {
        try {
            console.log(req.body)
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([vendor.add_service(req)])
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    update_service: async (req, res) => {
        try {
            console.log(req.body)
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([vendor.update_service(req)])
            jsonResponse(res, "sucess",results)
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
            // console.log(products, 'products')
            if(products.length > 0){
                let [results] = await Promise.all([vendor.new_leads(req,products)])
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
            jsonResponse(res, "sucess",result)

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
            const data=JSON.parse(results[0]?.data)
            const count=results[0]?.count
            const results1=results[0]?.type
            jsonResponse(res, "sucess",{results1,data,count})

        }
        catch(error){
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },
}