var appendDownload = require('./download.js').appendDownload;

document.addEventListener("DOMContentLoaded", function(event) {
    var link = appendDownload('Hello World');
    link.click();
    document.getElementById('static').click();
});
