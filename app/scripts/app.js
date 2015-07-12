// var say = require('./worker');
//
// setTimeout(say, 2000);
document.addEventListener("DOMContentLoaded", function(event) {
    var TableControl = require('./table.js');
    var tc = new TableControl(document.getElementById('table'),
                     ['1', '2', '3'],
                     [[123, 456, 789], [8, 80, 8080]]);
    tc.onSelected(function(data) {
        alert(data);
    });

    // setTimeout(function() {
    //     tc.bind([[3, 5, 5], [5, 9, 3]]);
    // }, 2000);
});
