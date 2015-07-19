// var say = require('./worker');
//
// setTimeout(say, 2000);

var fakeAPI = function(pageNo) {
    var headers = ['1', '2', '3'];
    var page1 = [
        [123, 456, 789],
        [8, 80, 8080]
    ];
    var page2 = [
        [223, 456, 789],
        [9, 90, 9090]
    ];
    var page3 = [
        [323, 456, 789],
        [1, 10, 1000]
    ];

    var pages = [page1, page2, page3];

    if (pageNo > 3) {
        return null;
    } else {
        return pages[pageNo - 1];
    }
};

document.addEventListener("DOMContentLoaded", function(event) {
    var TableControl = require('./table.js');
    var PagingControl = require('./paging.js');
    var tc = new TableControl(
        document.getElementById('table'), ['1', '2', '3'], [
            [123, 456, 789],
            [8, 80, 8080]
        ]);
    var pg = new PagingControl(
        document.getElementById('paging'), {
            displayed: 11,
            total: 20
        }
    );
    tc.onSelected(function(data) {
        alert(data);
    });

    pg.onSelected(function(pageNo) {
        tc.bind([[pageNo, 222, 333]]);
    });

    // setTimeout(function() {
    //     tc.bind([[3, 5, 5], [5, 9, 3]]);
    // }, 2000);
});
