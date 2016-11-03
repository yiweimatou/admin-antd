const initialFetchConfig = {
    needAuth: false
}

function checkStatus(data) {
    const {
        code,
        msg
    } = data
    if (code === 200) {
        return data
    } else if (code === 401) {
        localStorage.clear()
        window.location.reload()
    } else if (code === 500) {
        return Promise.reject('服务器开小差啦，请待会再试!')
    }
    return Promise.reject(msg)
}

function checkResponse(response) {
    if (response.ok) {
        return response.json()
    }
    return Promise.reject(`${response.status}:${response.statusText}`)
}

function queryString(params) {
    return Object.keys(params).map(i => `${i}=${encodeURIComponent(params[i])}`).join('&');
}

const ApiClient = {
    get(url: string, params: Object, fetchConfig: Object = initialFetchConfig) {
        let body
        if (fetchConfig.needAuth) {
            const key = localStorage.uid
            const token = localStorage.token
            body = `key=${key}&token=${token}&${queryString(params)}`
        } else {
            body = queryString(params)
        }
        return fetch(`${url}?${body}`, {
                method: 'GET'
            }).then(checkResponse).then(checkStatus)
    },
    post(url: string, params: Object, fetchConfig: Object = initialFetchConfig) {
        let body
        if (fetchConfig.needAuth) {
            const key = localStorage.uid
            const token = localStorage.token
            body = `key=${key}&token=${token}&${queryString(params)}`
        } else {
            body = queryString(params)
        }
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body
        }).then(checkResponse).then(checkStatus)
    }
}


export default ApiClient
