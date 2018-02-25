export default (vue) => {
	return {
		getCurrent() {
			return vue.Api.withCredentials(vue.credentials, null)
				.request('GET', 'getUserInfo.php')
		},
		logIn(loginData) {
			return vue.Api.request('POST', 'login.php', {
                    body: loginData
            })
		},
		signUp(signupData) {
			return vue.Api.request('POST', 'signup.php', {
                    body: signupData
            })
		}
	}
}