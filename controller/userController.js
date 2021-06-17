const {
    jsonResponse
} = require("./commonController");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const notificationModule = require('../module/notification');
const notification= new notificationModule();
let noti=[]


const accountSid='ACb505901926ff05773f53e233b9ef82ef'
const authToken='1bd840e04ba546378c83521ebc72b936'

const client=require('twilio')(accountSid,authToken)
const usersModule = require('../module/users');
const users = new usersModule();
var otp=0;

module.exports = {

    users: async (req, res) => {
        try {
         
            let [results] = await Promise.all([users.getUsersDetails()])
            jsonResponse(res, "sucess", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },

    singleUser: async (req, res) => {
        try {

            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([users.getUser(req)])
            jsonResponse(res, "sucess", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    insert_user: async (req, res) => {
        try {
            // req.body.name= "product111"
      
            let [results] = await Promise.all([users.insert_user(req)])
            jsonResponse(res, "User inserted", results)
        
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    signup: async (req, res) => {
        try {
            
            let [existingUser] = await Promise.all([users.signInWithEmail(req)])
            if(existingUser!=''){
                jsonResponse(res, "User Already Exists")
            }

            else {
                const password = req.body.password;
                const confirmPassword = req.body.confirmPassword;
                if(password!==confirmPassword){
                    jsonResponse(res, "Passwords do not match")
                }
                else{
                    req.body.password = await bcrypt.hash(password,12);
                    let [results] = await Promise.all([users.signup(req)])
                    let [results1] = await Promise.all([users.signInWithEmail(req)])
      
                    const id=results1[0]?.id;
                    const token = jwt.sign({email:results1[0].email, id:results1[0].id} , "secretkey" , {expiresIn:"30d"})
                    if(req.body.isUser){
                        let[s]=await Promise.all([notification.create_user(JSON.stringify(id),"user")])
                    }
                    else
                    {
                        let[s]=await Promise.all([notification.create_user(JSON.stringify(id),"vendor")])
                    }                 
                    await Promise.all([notification.setnotification(JSON.stringify(id),[{title:"Welcome",value:"App is available at PlayStore ! Please do checkout" , link:null}])])
                    jsonResponse(res, "User Created", {token,id})
                }

                
            }
        
        } catch (error) {
            console.log(error,"HELLO");
            jsonResponse(res, "error", error);
        };
    },
    signInWithOtp: async (req, res) => {
        try {
            otp=Math.floor((Math.random() * 999999) + 000000);
            // req.body.name= "product111"
            let [results] = await Promise.all([users.signInWithOtp(req)])
            // console.log(results,'inside sigin')
            // if(results.data.phone_no=== req.body.phone_no){
            if(results!=''){
                client.messages
                .create({
                    body:`This is your OTP ${otp} for login to Construction Flow `,
                    from:'+18182394629',
                    to:'+919009668488'
                })
                .then(message=>console.log(message.sid))
                jsonResponse(res, "Phone number exists");
            }
            else  {
                jsonResponse(res, "User doesn't exists with that phone no");

            }
        
        } catch (error) {
            console.log(error,"HELLO");
            jsonResponse(res, "error", error);
        };
    },
    verifyOtp: async (req, res) => {
        
        try {
            if(req.body.otp==otp){
                let [results] = await Promise.all([users.signInWithOtp(req)])
             
                jsonResponse(res, "User signed In", results);

            }
            else{
                jsonResponse(res,"please send correct otp");
            }
        
        
        } catch (error) {
            console.log(error,"HELLO");
            jsonResponse(res, "error", error);
        };
    },
    signInWithEmail: async (req, res) => {
        try {

            let [results] = await Promise.all([users.signInWithEmail(req)])
            let sqlpassword=results[0].password;
            const isPasswordCorrect =await bcrypt.compare(req.body.password,sqlpassword)
            
            if(isPasswordCorrect){

                const id=results[0].id;
                const token = jwt.sign({email:results[0].email, id:results[0].id} , "secretkey" , {expiresIn:"30d"})
                let [result1]=await Promise.all([notification.find_user(JSON.stringify(results[0].id))])
                if(result1 != ''){
                    console.log('user exists')
                }
                else{
                    console.log('else')
                    
                    

                }  
                jsonResponse(res, "User signed In", {token,id}) 
                
                
            }
            else{
                jsonResponse(res, "Password Incorrect"); 
            }
        
        } catch (error) {
            console.log(error)
            jsonResponse(res, "User doesn't exists", error);
        };
    },
    updateUser: async (req, res) => {
        try {

            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            
            let [results] = await Promise.all([users.updateUser(req)])
            jsonResponse(res, "sucess", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    
    get_user: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([users.get_user(req)])
            // results[0].site=JSON.parse(results[0].site)
          
            
            
            
            jsonResponse(res, "Got the details of user", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    add_site: async (req, res) => {
        try {
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results1] = await Promise.all([users.get_site(req)])   
     
            let arr=[];
            let temp=JSON.parse(results1[0].site)
            

            //req.body => New Data
            // results1[0].site is array with stored values
            if( (results1[0].site) !== null)

            {   
                for(var i=0;i<temp?.length;i++){
                    arr.push(JSON.parse(results1[0]?.site)[i]);
                }
                
               
                arr.push(req.body);
            }

            else arr=[req.body]
            
            let [results] = await Promise.all([users.add_site(req,arr)])
            jsonResponse(res, "sucess", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    update_site: async (req, res) => {
        try {
            console.log(req.body,"site")
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            
            // let [results1]= await Promise.all([users.get_site(req)])
            // JSON.parse(results1,"resu")
            // console.log(results1,"results11 site")
           
            let [results] = await Promise.all([users.update_site(req)])
            jsonResponse(res, "sucess", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    // 
    
    // 
    get_site: async (req, res) => {
        try {
            // console.log(req.body,"SITE")
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results1] = await Promise.all([users.get_site(req)])
            let temp = JSON.parse(results1[0].site)
            jsonResponse(res, "sucess", temp)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    add_feedback: async (req, res) => {
        try {
         
            // console.log(JSON.parse(req.body),"PARSE")
            // console.log(JSON.stringify(req.body),"STRING")
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([users.add_feedback(req)])
            jsonResponse(res, "sucess", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    request_help: async (req, res) => {
        try {
            // // req.body.name= "product111"
            // console.log(req.body,"HIII")

            // console.log(JSON.stringify(req.body.brands))
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([users.request_help(req)]);
            jsonResponse(res, "file inserted")
        
        } catch (error) {
         //By Akhtar
            console.log(error);
            jsonResponse(res, "error", error);
        };
    }, 

    user_accepted_pitch: async (req, res) => {
        try {
   
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let vendor=await Promise.all([users.get_vendor(req)])
            console.log(vendor[0][0].company_name,"vendor")
            const company_name=vendor[0][0]?.company_name
            let [results] = await Promise.all([users.user_accepted_pitch(req,company_name)])
            let [results1]= await Promise.all([users.product_table_status_changed(req)])
       
            let detail ={title:"Pitch accepted",value:req.body.Pitch_value,link:"local/to/table"}
            notification.getnotification(req.body.Uid,detail)
            jsonResponse(res, "sucess", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    user_rejected_pitch: async (req, res) => {
        try {
            console.log(req.body)
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([users.user_rejected_pitch(req)])

            jsonResponse(res, "sucess", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    Tablefilter:async(req,res)=>{
        try {
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let result=await Promise.all([users.Table_filter(req)])
            jsonResponse(res, "sucess",result)

        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },
    Typefilter:async(req,res)=>{
        try {
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let result=await Promise.all([users.Type_filter(req)])
            jsonResponse(res, "sucess",result)

        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },
    
}