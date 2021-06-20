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
mysqliq['service_exist'] = 'SELECT info from vendor_services where vendor_id=? AND type=?';
mysqliq['add_service'] = 'INSERT into vendor_services(vendor_id,service_type,type,info) values(?,?,?,?)';

mysqliq['update_service'] = 'UPDATE vendor_services SET info=? where vendor_id=? AND type=?';

mysqliq['delete_service'] = 'DELETE from vendor_services where vendor_id=? AND type=?';

mysqliq['get_services'] = 'SELECT * from vendor_services where vendor_id=?';
mysqliq['get_services_by_type'] = 'SELECT * from vendor_services where vendor_id=? AND type=?';
mysqliq['new_leads']='SELECT P.* from product P INNER JOIN vendorproduct VP ON ((P.id NOT IN (SELECT Pid FROM vendorproduct)) OR (P.id = VP.Pid AND VP.Uid != ?) ) WHERE P.type IN (?) AND P.status=? GROUP BY P.id';
mysqliq['new_leads1']='SELECT P.* from product P WHERE P.type IN (?) AND P.status=?';
mysqliq['get_pending_leads']='SELECT * from vendorproduct INNER JOIN product on vendorproduct.Pid=product.id WHERE vendorproduct.Uid=? AND vendorproduct.product_status=? ';
mysqliq['get_pending_leads_by_type']='SELECT * from vendorproduct INNER JOIN product on vendorproduct.Pid=product.id WHERE vendorproduct.Uid=? AND (vendorproduct.product_status=? AND product.type=?)';
mysqliq['get_saved_leads']='SELECT * from vendorproduct INNER JOIN product on vendorproduct.Pid=product.id WHERE vendorproduct.Uid=? AND (vendorproduct.product_status=? OR vendorproduct.product_status=?)';
mysqliq['products']='SELECT type from vendor_services  WHERE vendor_id=? GROUP BY type';
mysqliq['total_services']='SELECT count(*) from vendor_services  WHERE vendor_id=?';
mysqliq['maximum_sales_vendor']='SELECT count(*),type from product  WHERE accepted_vendor=? GROUP BY type ORDER BY count(*) DESC';
mysqliq['sales_vendor']='SELECT product_status,count(*) as count from vendorproduct  WHERE Uid=? AND (product_status!=? AND product_status!=?) GROUP BY product_status';
mysqliq['most_requested_service']='SELECT count(product.type) AS count,product.type  from product INNER JOIN vendor_services on vendor_services.type=product.type  WHERE vendor_services.vendor_id=? GROUP BY product.type ORDER BY count(product.type) DESC';

mysqliq['vendor_contribution']='SELECT count(*) AS count from product  WHERE status=? AND accepted_vendor=?';
mysqliq['no_of_total_sales']='SELECT count(*) AS count from product  WHERE status=?';
mysqliq['vendor_pitched']='INSERT into vendorproduct(Pid,Uid,pitch_value,price_detail,product_status) VALUES(?,?,?,?,?)';
mysqliq['vendor_rejected']='INSERT into vendorproduct(Pid,Uid,product_status) VALUES(?,?,?)';


mysqliq['get_user_id']='SELECT user_id from product where id=?'
mysqliq['vendor_month_sale']="SELECT product_status,count(*) as count from vendorproduct  WHERE Uid=? AND (product_status!=? AND product_status!=?) AND updated_at BETWEEN ? and ? GROUP BY product_status"
// mysqliq['vendor_month_sale']="SELECT count(*) AS total FROM product WHERE accepted_vendor=? AND (updated_at BETWEEN ? and ?) AND status = ?"


mysqliq['current_month_sale']='SELECT COUNT(*) AS currmonth FROM vendorproduct WHERE product_status="acceptedPitch" AND Uid=? AND updated_at BETWEEN ? and ?'
mysqliq['prev_month_sale']='SELECT COUNT(*) AS prevMonth FROM vendorproduct WHERE product_status="accepted" AND Uid=? AND updated_at BETWEEN ? and ?'
mysqliq['most_sold_product']='SELECT data,type,COUNT(type) AS count FROM product WHERE status="accepted" AND accepted_vendor=? AND updated_at BETWEEN ? and ? GROUP BY type'
mysqliq['get_price_detail'] = 'SELECT * FROM vendorproduct WHERE Uid=? AND Pid=?'
mysqliq['vendor'] ='select * from vendorproduct'

