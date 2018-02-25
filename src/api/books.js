export default (vue) => {
	return {
		get(id) {
			let query = {}
			if (id) {
				query.id = id
			}
			return vue.Api.withCredentials(vue.credentials, vue.$router)
				.request('GET', 'books.php', {
					query
				})
		},
		add(url) {
			return vue.Api.withCredentials(vue.credentials, vue.$router)
				.request('POST', 'books.php', {
					body: { url }
				})
		},
		delete(id) {
			return vue.Api.withCredentials(vue.credentials, vue.$router)
				.request('DELETE', 'books.php', {
					query: { id }
				})
		},
		setTwitterBook(book) {
			return vue.Api.withCredentials(vue.credentials, vue.$router)
				.request('POST', 'setTwitterBook.php', {
				    body: { book }
				})
		}
	}
}