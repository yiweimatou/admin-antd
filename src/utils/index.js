export const isNullOrEmpty = value => value === '' && value === null && value === undefined

export const matchRegexp = (value, regexp) => isNullOrEmpty(value) || regexp.test(value)

export const isMobile = value =>
    matchRegexp(value, /^(13\d|15[^4,\D]|17[13678]|18\d)\d{8}|170[^346,\D]\d{7}$/)

export const isUrl = value =>
    matchRegexp(value, /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.?)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\\d_]*)?$/i)

export function loadJS(url: string, success: Function) {
     const domScript = document.createElement('script');
     domScript.src = url;
     success = success || function () {}
     if (navigator.userAgent.indexOf('MSIE') > 0) {
         domScript.onreadystatechange = function () {
             if (this.readyState === 'loaded' || this.readyState === 'complete') {
             success();
             this.onload = this.onreadystatechange = null;
             this.parentNode.removeChild(this);
             }
         }
     } else {
         domScript.onload = function () {
             success();
             this.onload = this.onreadystatechange = null;
             this.parentNode.removeChild(this);
         }
     }
     document.getElementsByTagName('head')[0].appendChild(domScript);
}
