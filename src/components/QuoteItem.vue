<template>
	<blockquote>
		<p class="text">{{ quote.text }}</p>
		<template v-if="canEdit">
			<a @click="editQuote" class="btn btn-link">
				<span class="icon-pencil" aria-hidden="true"></span>
			</a>
			&nbsp;
			<a class="btn btn-link" @click="deleteQuote">
				<span class="icon-bin" aria-hidden="true"></span>
			</a>
		</template>
		<small v-if="needsBookLink">
			<router-link :to="{name: isPublic ? 'PublicBookQuotes' : 'BookQuotes', params: {userId: quote.user_id, bookId: quote.bookId, bookTitle: quote.bookTitle}}">
				{{ quote.bookTitle }}
			</router-link>
		</small>
	</blockquote>
</template>
<script>
	export default {
		props: ['quote', 'canEdit', 'isPublic', 'needsBookLink'],
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

<style>
	blockquote {
		margin: 0 10px 40px 10px;
	}
	
	blockquote .btn {
		padding: 0px;
	}
	
	blockquote .text {
		white-space: pre-wrap;
	}
</style>