import 'whatwg-fetch'

const API = process.env.API_URL

function createApiObject(credentials = null, router = null) {
    return {
        credentials: credentials,
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
                    'Content-Type': 'application/json'
                }
            }

            if (this.credentials) {
                fetchParams.headers['X-Auth-Email'] = this.credentials.email
                fetchParams.headers['X-Auth-Key'] = this.credentials.key
            }

            if (type != 'GET' && type != 'HEAD') {
                fetchParams.body = JSON.stringify(params.body)
            }

            return fetch(`${API}${method}?${queryString}`, fetchParams)
                .then(response => {
                    if (!response.ok) {
                        if (response.status == 401 && router) {
                            router.replace({name: 'Login'})
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
        withCredentials(credentials, router) {
            return createApiObject(credentials, router)
        }
    }
}

export default createApiObject()