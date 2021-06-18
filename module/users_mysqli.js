module.exports = class mysqli {
    async mysqli(data, row) {
        let k = mysqliq[row];
        for (var i in data) {
            k = k.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
        }
        return k;
    }

    async sfqli(data, row) {
        let k = mysqliq[row];
        for (var i in data) {
            k = k.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
        }
        return k;
    }
};


var mysqliq = []
//user
mysqliq['all_users'] = 'SELECT * FROM users';
mysqliq['single_user'] = 'SELECT * FROM users WHERE id = ?'



mysqliq['insert_user'] = 'INSERT into users (email,password) values(?,?)';
mysqliq['signup'] = 'INSERT into users (email,phone_no,password,isUser) values(?,?,?,?)';
mysqliq['signInWithOtp'] = 'SELECT * from users WHERE phone_no=? ';
mysqliq['signInWithEmail'] = 'SELECT * from users WHERE email=? ';
mysqliq['get_user']="SELECT * from users WHERE id=?"
mysqliq['updateUser'] = 'UPDATE users SET first_name=?,email=?,pin=?,phone_no=?,whatsapp_no=?,state=?,city=?,company_detail_name=?,company_name=?,company_title=?,company_whatsapp_no=?,company_phone_no=?,company_email_address=?,company_building_name=?,company_house_no=?,company_street=?,company_landmark=?,company_city=?,company_state=?,company_pincode=?,fax=? WHERE id=? ';
// [req.body.first_name,
//     req.body.email,
//     req.body.pin,
//     req.body.phone_no,
//     req.body.whatsapp_no,
//     req.body.state,
//     req.body.city,
//     req.body.company_detail_name,
//     req.body.company_name,
//     req.body.company_title,
//     req.body.company_whatsapp_no,
//     req.body.company_phone_no,
//     req.body.company_email_address,
//     req.body.company_building_name,
//     req.body.company_house_no,
//     req.body.company_street,
//     req.body.company_landmark,
//     req.body.company_city,
//     req.body.company_state,
//     req.body.company_pincode,
//     req.body.id];
mysqliq['add_site']= 'UPDATE users SET site=? where id=?';
mysqliq['get_site']= 'SELECT site from users where id=?';

mysqliq['add_feedback']='UPDATE users set feedback =? WHERE id=?' 

mysqliq['request_help'] = 'INSERT into helps (u_id,message, file_dest, file_type) values(?,?,?,?)'; //Akhtar
mysqliq['user_accepted_pitch']='UPDATE vendorproduct set product_status=?,vendor_name=? WHERE Pid=? AND Uid=? '
mysqliq['product_table_status_changed']='UPDATE product set status=? , accepted_vendor=?,final_pitchValue=? WHERE id=?'

mysqliq['user_rejected_pitch']='UPDATE vendorproduct set product_status=? WHERE Pid=? AND Uid=?'

mysqliq['get_user_id']='SELECT user_id from product where id=?'
mysqliq['table_filter']='SELECT DISTINCT(type) from product where user_id=?;'
mysqliq['type_filter']='SELECT vendor_services.type,COUNT(vendor_services.type) from vendor_services INNER JOIN product ON vendor_services.type=product.type AND vendor_services.vendor_id=?  AND product.status="pending" GROUP by vendor_services.type'