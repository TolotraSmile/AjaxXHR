/**
 * Created by tmsc on 16/08/2016.
 */

class Ajax {

    private url:string;
    private method:string;
    private window:Window;
    private xhr:XMLHttpRequest;

    constructor(url:string, method:string, window:Window) {
        this.url = url;
        this.method = method;
        this.window = window;
        this.xhr = null;
    }

    private getHttpRequest():any {
        if (this.xhr !== null) return this.xhr;

        var httpRequest:any = false;
        if (this.window.XMLHttpRequest) { // Mozilla, Safari,...
            httpRequest = new XMLHttpRequest();
            if (httpRequest.overrideMimeType) {
                httpRequest.overrideMimeType('text/xml');
            }
        } else if (this.window.ActiveXObject) { // IE
            try {
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    console.log(e);
                    throw e;
                }
            }
        }
        this.xhr = !httpRequest ? null : httpRequest;

        return this.xhr;
    }

    public request(data:FormData, onsuccess:any, onerror) {
        let xhr = this.getHttpRequest();
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
            } else {
                xhr.open(this.method, this.url, true);
                xhr.send(data);
            }
            xhr.addEventListener('readystatechange', (event:Event):any => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 0 || xhr.status == 200) {
                        onsuccess(xhr)
                    } else {
                        onerror(xhr)
                    }
                }
            })
        }
    }
}