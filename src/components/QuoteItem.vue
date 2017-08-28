<template>
	<blockquote>
		<p class="text">{{ quote.text }}</p>
		<small v-if="!canEdit">
				<router-link :to="{name: 'BookQuotes', params: {bookId: quote.bookId, bookTitle: quote.bookTitle}}">
					{{ quote.bookTitle }}
				</router-link>
			</small>
		<span v-else>
				<a @click="editQuote" class="btn btn-link">
					<span class="icon-pencil" aria-hidden="true"></span>
		</a>
		&nbsp;
		<a class="btn btn-link" @click="deleteQuote">
			<span class="icon-bin" aria-hidden="true"></span>
		</a>
		</span>
	</blockquote>
</template>
<script>
	export default {
		props: ['quote', 'canEdit'],
		methods: {
			editQuote() {
				this.$root.bus.$emit('edit-quote', this.quote)
			},
			deleteQuote() {
				this.$root.bus.$emit('delete-quote', this.quote.id)
			}
		}
	}

</script>