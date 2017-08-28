export default (vue) => {
	return {
		get(book) {
			let query = {}
            if (book) {
                query.book = book
            }
			return vue.Api.withSession(vue.user.session, vue.$router)
			.request('GET', 'quotes.php', {
				query
			})
		},
		add(quoteData) {
			return vue.Api.withSession(vue.user.session, vue.$router)
				.request('POST', 'quotes.php', {
					body: { 
						text: quoteData.text
					},
					query: {
						book: quoteData.book
					}
				})
		},
		edit(quoteData) {
			return vue.Api.withSession(vue.user.session, vue.$router)
				.request('PATCH', 'quotes.php', {
					body: { 
						text: quoteData.text
					},
					query: {
						id: quoteData.id
					}
				})
		},
		delete(id) {
			return vue.Api.withSession(vue.user.session, vue.$router)
				.request('DELETE', 'quotes.php', {
					query: { id }
				})
		}
	}
}