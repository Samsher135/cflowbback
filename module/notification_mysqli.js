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

//to get all the notification of user
mysqliq['all_notification']="SELECT details from notification where userid=?";

//to insert a notification
mysqliq['notification_set']='UPDATE notification set details=? WHERE userid=?';
mysqliq['get_notification']='SELECT details from notification where userid=?';

//to insert a notification as pinned
mysqliq['get_notification1']='SELECT pinned from notification where userid=?';
mysqliq['notification_set1']='UPDATE notification set pinned=? WHERE userid=?';

//check user
mysqliq['find_user'] ='SELECT * from notification where userid=? '
//creating user
mysqliq['create_user'] ='INSERT into notification (userid,type) value(?,?)'


//to all  user
mysqliq['all_user']='UPDATE notification set details=? WHERE type=?';
mysqliq['get_all']='SELECT details from notification where type=?';