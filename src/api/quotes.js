export default (vue) => {
	return {
		get(book) {
			let query = {}
            if (book) {
                query.book = book
            }
			return vue.Api.withCredentials(vue.credentials, vue.$router)
			.request('GET', 'quotes.php', {
				query
			})
		},
		add(quoteData) {
			return vue.Api.withCredentials(vue.credentials, vue.$router)
				.request('POST', 'quotes.php', {
					body: { 
						text: quoteData.text,
						isPublic: quoteData.isPublic,
					},
					query: {
						book: quoteData.book
					}
				})
		},
		edit(quoteData) {
			return vue.Api.withCredentials(vue.credentials, vue.$router)
				.request('PATCH', 'quotes.php', {
					body: { 
						text: quoteData.text,
						isPublic: quoteData.isPublic,
					},
					query: {
						id: quoteData.id
					}
				})
		},
		delete(id) {
			return vue.Api.withCredentials(vue.credentials, vue.$router)
				.request('DELETE', 'quotes.php', {
					query: { id }
				})
		}
	}
}