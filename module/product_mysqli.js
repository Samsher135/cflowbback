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

mysqliq['insert_product'] = 'INSERT into product (name,type) values(?,?)';
mysqliq['no_of_requests']='SELECT COUNT(*) AS count FROM product where user_id=? AND status=?'
mysqliq['maximum_sales']='SELECT COUNT(*)as count,type  FROM product where status=? GROUP BY type ORDER by COUNT(*) DESC';
mysqliq['pitched_requests']='SELECT product.*,vendorproduct.* from vendorproduct INNER JOIN product ON product.id=vendorproduct.Pid WHERE product.user_id=? AND (vendorproduct.product_status=? OR vendorproduct.product_status=? OR vendorproduct.product_status=?)';

mysqliq['saved_requests']='SELECT product.*,vendorproduct.* from vendorproduct INNER JOIN product ON product.id=vendorproduct.Pid WHERE product.user_id=? AND (vendorproduct.product_status=? OR vendorproduct.product_status=?)';
mysqliq['request_service'] = 'INSERT into product(user_id,service_type,type,quantity,status,urgent,deliver_by,delivery_address,data) values(?,?,?,?,?,?,?,?,?)'; 
mysqliq['new_requests']='SELECT P.*,VP.* from product P INNER JOIN vendorproduct VP ON (P.id NOT IN (SELECT Pid FROM vendorproduct)) WHERE P.user_id =? AND  P.status=? GROUP BY P.id'

mysqliq['vendor_id'] ='select vendor_id from vendor_services where type=?'