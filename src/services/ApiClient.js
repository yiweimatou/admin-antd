import fetch from 'isomorphic-fetch'
const initialFetchConfig = {
    needAuth:false
}
function checkStatus(data) {
    if( data.code === 401 ){
        localStorage.clear()
        window.location.reload()
    }
    return data
}
const ApiClient = {
    get(url, params, fetchConfig = initialFetchConfig) {
        let body
        if (fetchConfig.needAuth) {
            const auth = JSON.parse(localStorage.getItem('auth'))
            const {
                key,
                token
            } = auth
            body = `key=${key}&token=${token}&${queryString(params)}`
        } else {
            body = queryString(params)
        }
        return fetch(`${url}?${body}`, {
                method: 'GET'
            }).then(response =>
                response.ok ?
                response.json() :
                Promise.reject(`${response.status}:${response.statusText}`))
            .then(data => {
                const {
                    code,
                    msg
                } = data
                if (code === 200) {
                    return data
                } else {
                    return Promise.reject(msg)
                }
            })
    },
    post(url,params,fetchConfig=initialFetchConfig){
        let body
        if (fetchConfig.needAuth) {
            const auth = JSON.parse(localStorage.getItem('auth'))
            const {
                key,
                token
            } = auth
            body = `key=${key}&token=${token}&${queryString(params)}`
        } else {
            body = queryString(params)
        }
        return fetch(url, {
                method: 'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body
            }).then(response =>
                response.ok ?
                response.json() :
                Promise.reject(`${response.status}:${response.statusText}`))
            .then( data => checkStatus(data) )
            .then(data => {
                const {
                    code,
                    msg
                } = data
                if (code === 200) {
                    return data
                } else {
                    return Promise.reject(msg)
                }
            })
    },
    put(url,params){
        const auth = JSON.parse(localStorage.getItem('auth'))
        const {
            key,
            token
        } = auth
        const body = `key=${key}&token=${token}&${queryString(params)}`
        return fetch(url, {
                method: 'PUT',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body:body
            }).then(response =>
                response.ok ?
                response.json() :
                Promise.reject(`${response.status}:${response.statusText}`))
            .then( data => checkStatus(data) )
            .then(data => {
                const {
                    code,
                    msg
                } = data
                if (code === 200) {
                    return data
                } else {
                    return Promise.reject(msg)
                }
            })
    },
    remove(url,params){
        const auth = JSON.parse(localStorage.getItem('auth'))
        const {
            key,
            token
        } = auth
        const body = `key=${key}&token=${token}&${queryString(params)}`
        return fetch(url, {
                method: 'DELETE',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body:body
            }).then(response =>
                response.ok ?
                response.json() :
                Promise.reject(`${response.status}:${response.statusText}`))
            .then( data => checkStatus(data) )
            .then(data => {
                const {
                    code,
                    msg
                } = data
                if (code === 200) {
                    return data
                } else {
                    return Promise.reject(msg)
                }
            })
    }
}

function queryString(params) {
    let s = ''
    for(let p in params){
        if(params.hasOwnProperty(p)){
            s+=`${p}=${params[p]}&`
        }
    }
    return s
}

export default ApiClient