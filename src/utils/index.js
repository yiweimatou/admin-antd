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

export const ytRegExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
export const youkuRegExp = /https?:\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/
export const qqRegExp = /\S*v.qq.com\S*vid=(\S+)/
export const qqRegExp2 = /\S*v.qq.com\S*\/(\S+).html/

export const videoUrlConvert = (url) => {
    const ytMatch = url.match(ytRegExp)
    const youkuMatch = url.match(youkuRegExp)
    const qqMatch = url.match(qqRegExp)
    const qqMatch2 = url.match(qqRegExp2)
    if (youkuMatch && youkuMatch[1].length > 0) {
        return `//player.youku.com/embed/${youkuMatch[1]}`
    } else if (qqMatch && qqMatch[1].length > 0) {
        return `http://v.qq.com/iframe/player.html?tiny=0&auto=0&vid=${qqMatch[1]}`
    } else if (qqMatch2 && qqMatch2[1].length > 0) {
        return `http://v.qq.com/iframe/player.html?tiny=0&auto=0&vid=${qqMatch2[1]}`
    } else if (ytMatch && ytMatch[1].length > 0) {
        return `//www.youtube.com/embed/${ytMatch[1]}`
    }
    return ''
}

export const isBaike = value => isUrl(value) && matchRegexp(value, /^http:\/\/baike.baidu.com*/)

export const isWX = value => isUrl(value) && matchRegexp(value, /mp.weixin.qq.com*/)
