/**
 * Created by tmsc on 11/08/2016.
 */
/**
 * Created by tmsc on 21/07/2016.
 */


var Ajax = function (url,data) {
    this.url = url;
    this.data = data;
};

Ajax.prototype.getHttpRequest = function () {
    //if (this.httpRequest === null || this.httpRequest === undefined) {
    var httpRequest = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        httpRequest = new XMLHttpRequest();
        if (httpRequest.overrideMimeType) {
            httpRequest.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                console.log(e);
            }
        }
    }
    return !httpRequest ? false : httpRequest;
    // }
    //return this.httpRequest;
};

Ajax.prototype.post = function (callback) {
    var xhr = Ajax.prototype.getHttpRequest();
    if (xhr) {
        xhr.open('POST',this.url,true);
        xhr.addEventListener('readystatechange',function () {
            console.log(xhr.readyState);
            callback(xhr);
        });
        xhr.send(this.data);
    } else {
        throw new XMLHttpRequestException('Impossible to create XMLHttp object.')
    }
};

Ajax.prototype.get = function (callback) {
    var xhr = Ajax.prototype.getHttpRequest();
    if (xhr !== false) {
        xhr.open('GET',this.url,true);
        xhr.addEventListener('readystatechange',function () {
            console.log(xhr.readyState);
            callback(xhr);
        });
        xhr.send(this.serialize());
    } else {
        throw new XMLHttpRequestException('Impossible to create XMLHttp object.')
    }
};

Ajax.prototype.serialize = function () {
    var pairs = [];

    console.log(this.data);

    if (!this.data) {
        return '';
    }

    for (var prop in this.data) {
        if (!this.data.hasOwnProperty(prop)) {
            continue;
        }
        if (Object.prototype.toString.call(this.data[prop]) == '[object Object]') {
            pairs.push(this.serialize(this.data[prop]));
            continue;
        }
        pairs.push(prop + '=' + this.data[prop]);
    }
    return pairs.join('&');
};