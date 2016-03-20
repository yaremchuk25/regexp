var addresses = require('./addresses');

var result = [];

for(var i=0; i<addresses.length; i++) {
    var location = {};
    var regular = /^\s*(ул|пр-т|пл|пер)?\.?\s*/;
    var str = addresses[i].replace(regular, "");

    var house_reg = /\s*,?\s*(дом)?\s*(\d+(-[\w\dА-Яа-я])?)(\/(\d+))?\s*,?\s*(кв)?\.?\s*(\d+)?\s*$/;
    location.street = str.replace(house_reg, "");
    var exec_arr = house_reg.exec(str);

    if (!exec_arr) {
        result.push(location);
        continue;
    }

    location.house = exec_arr[2];

    if (exec_arr[5] || exec_arr[7]) {
        location.flat = exec_arr[5] || exec_arr[7];
    }

    result.push(location);
}

module.exports = result;