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

mysqliq['add_service'] = 'INSERT into vendor_services(vendor_id,service_type,type,info) values(?,?,?,?)';

mysqliq['update_service'] = 'UPDATE vendor_services SET info=? where vendor_id=? AND type=?';

mysqliq['get_services'] = 'SELECT * from vendor_services where vendor_id=?';
mysqliq['get_services_by_filter'] = 'SELECT * from vendor_services where vendor_id=? AND type=?';
mysqliq['new_leads']='SELECT P.* from product P INNER JOIN vendorproduct VP ON ((P.id NOT IN (SELECT Pid FROM vendorproduct)) OR (P.id = VP.Pid AND VP.Uid != ?) ) WHERE P.type IN (?) AND P.status=? GROUP BY P.id';
mysqliq['get_pending_leads']='SELECT * from vendorproduct INNER JOIN product on vendorproduct.Pid=product.id WHERE vendorproduct.Uid=? AND vendorproduct.product_status=? ';
mysqliq['get_pending_leads_by_type']='SELECT * from vendorproduct INNER JOIN product on vendorproduct.Pid=product.id WHERE vendorproduct.Uid=? AND (vendorproduct.product_status=? AND product.type=?)';
mysqliq['get_saved_leads']='SELECT * from vendorproduct INNER JOIN product on vendorproduct.Pid=product.id WHERE vendorproduct.Uid=? AND (vendorproduct.product_status=? OR vendorproduct.product_status=?)';
mysqliq['products']='SELECT type from vendor_services  WHERE vendor_id=? GROUP BY type';
mysqliq['total_services']='SELECT count(*) from vendor_services  WHERE vendor_id=?';
mysqliq['maximum_sales_vendor']='SELECT count(*),type from product  WHERE accepted_vendor=? GROUP BY type ORDER BY count(*) DESC';
mysqliq['sales_vendor']='SELECT status,count(*) from vendorproduct  WHERE Uid=? AND (product_status!=? AND product_status!=?) GROUP BY product_status';
mysqliq['most_requested_service']='SELECT count(product.service_type) AS count,product.service_type  from product INNER JOIN vendor_services on vendor_services.service_type=product.service_type  WHERE vendor_services.vendor_id=? GROUP BY product.service_type ORDER BY count(product.service_type) DESC';

mysqliq['vendor_contribution']='SELECT count(*) AS count from product  WHERE status=? AND accepted_vendor=?';
mysqliq['no_of_total_sales']='SELECT count(*) AS count from product  WHERE status=?';
mysqliq['vendor_pitched']='INSERT into vendorproduct(Pid,Uid,pitch_value,product_status) VALUES(?,?,?,?)';
mysqliq['vendor_rejected']='INSERT into vendorproduct(Pid,Uid,product_status) VALUES(?,?,?)';


mysqliq['get_user_id']='SELECT user_id from product where id=?'

mysqliq['vendor_month_sale']="SELECT product_status,count(*) AS total FROM vendorproduct WHERE Uid=? AND updated_at BETWEEN ? and ? GROUP BY product_status"