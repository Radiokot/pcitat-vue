import 'whatwg-fetch'

const API = 'https://pc.radiokot.com.ua/api/'

function createApiObject(session = null, router = null) {
    return {
        session: session,
        router: router,
        request(type, method, params = {
            query: {},
            body: {}
        }) {
            let queryString =
                params.query != null
                    ? Object.keys(params.query)
                        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params.query[k])}`)
                        .join('&')
                    : ''

            let fetchParams = {
                method: type,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Session': this.session
                }
            }

            if (type != 'GET' && type != 'HEAD') {
                fetchParams.body = JSON.stringify(params.body)
            }

            return fetch(`${API}${method}?${queryString}`, fetchParams)
                .then(response => {
                    if (!response.ok) {
                        if (response.status == 401 && router) {
                            router.push({name: 'Login'})
                        }

                        return Promise.reject({
                            code: response.status,
                            message: response.statusText
                        })
                    }
                    return response.json()
                })
                .then(response => response.response)
        },
        withSession(session, router) {
            return createApiObject(session, router)
        }
    }
}

export default createApiObject()