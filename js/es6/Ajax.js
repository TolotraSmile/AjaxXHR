/**
 * Created by tmsc on 16/08/2016.
 */
var Ajax = (function () {
    function Ajax(url, method, window) {
        this.url = url;
        this.method = method;
        this.window = window;
        this.xhr = null;
    }
    Ajax.prototype.getHttpRequest = function () {
        if (this.xhr !== null)
            return this.xhr;
        var httpRequest = false;
        if (this.window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest();
            if (httpRequest.overrideMimeType) {
                httpRequest.overrideMimeType('text/xml');
            }
        }
        else if (this.window.ActiveXObject) {
            try {
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e) {
                try {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e) {
                    console.log(e);
                    throw e;
                }
            }
        }
        this.xhr = !httpRequest ? null : httpRequest;
        return this.xhr;
    };
    Ajax.prototype.request = function (data, onsuccess, onerror) {
        var xhr = this.getHttpRequest();
        if (xhr !== null) {
            if (this.method.toUpperCase() === 'GET') {
                var items = [];
                if (data.forEach) {
                    data.forEach(function (index, item) {
                        items.push(index + '=' + item);
                    });
                }
                xhr.open(this.method, this.url + '?' + items.join('&'), true);
                xhr.send(null);
            }
            else {
                xhr.open(this.method, this.url, true);
                xhr.send(data);
            }
            xhr.addEventListener('readystatechange', function (event) {
                if (xhr.readyState == 4) {
                    if (xhr.status == 0 || xhr.status == 200) {
                        onsuccess(xhr);
                    }
                    else {
                        onerror(xhr);
                    }
                }
            });
        }
    };
    return Ajax;
}());
//# sourceMappingURL=Ajax.js.map