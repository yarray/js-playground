module.exports = {
    appendDownload: function(content) {
        var link = document.createElement('a');
        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
        link.setAttribute('download', 'temp.meta');
        return link;
    }
};
