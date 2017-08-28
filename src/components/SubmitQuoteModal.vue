<template>
	<div class="modal fade" :id="modalId" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">{{ (isAdd ? 'Добавить' : 'Изменить' ) + ' цитату'}}</h4>
				</div>
				<form @submit.prevent="onTextSubmitted">
					<div class="modal-body">
						<div class="form-group">
							<label for="quoteText">Текст цитаты</label>
							<textarea @keydown.ctrl.enter="onTextSubmitted" @keydown.meta.enter="onTextSubmitted" class="form-control" v-model="quoteText" rows="5" required autocomplete="off" autofocus></textarea>
						</div>
						<ErrorAlert :message="errorMessage"></ErrorAlert>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Отмена</button>
						<input type="submit" :class="['btn', 'btn-info', !submitButtonEnabled ? 'disabled' : '']" :value="isAdd ? 'Добавить' : 'Изменить'">
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
	import Quotes from '@/api/quotes'

	export default {
		data() {
			return {
				isAdd: false,
				bookId: '',
				quoteId: '',
				quoteText: '',
				errorMessage: '',
				submitButtonEnabled: true,
				modalId: 'submitQuoteModal'
			}
		},
		computed: {
			queryModalId() {
				return '#' + this.modalId
			}
		},
		mounted() {
			$(this.queryModalId).on('shown.bs.modal', function () {
				$(this).find('[autofocus]').focus()
			})

			this.$root.bus.$on('edit-quote', this.onEditQuote)
			this.$root.bus.$on('add-quote', this.onAddQuote)
		},
		methods: {
			onEditQuote(quote) {
				this.isAdd = false
				this.quoteText = quote.text
				this.quoteId = quote.id
				this.errorMessage = ''

				$(this.queryModalId).modal('show')
			},
			onAddQuote(bookId) {
				this.isAdd = true
				this.bookId = bookId
				this.quoteText = ''
				this.errorMessage = ''

				$(this.queryModalId).modal('show')
			},
			onTextSubmitted() {
				 if (!this.submitButtonEnabled) {
                    return
                }
                this.submitButtonEnabled = false
				this.errorMessage = ''
                this.submitQuote()
			},
			submitQuote() {
				let call = this.isAdd 
					? Quotes(this.$root).add({
						text: this.quoteText,
						book: this.bookId
					})
					: Quotes(this.$root).edit({
						text: this.quoteText,
						id: this.quoteId
					})

				call.then(quote => {
						this.submitButtonEnabled = true

						if (this.isAdd) {
							let book = this.$root.$data.books
								.find(it => it.id == this.bookId)
							let index = this.$root.$data.books.indexOf(book)
							if (index != -1) {
								book.quotesCount = parseInt(book.quotesCount) + 1
								this.$set(this.$root.$data.books, index, book)
							}

							this.$root.bus.$emit('quote-added', quote)
						} else {
							this.$root.bus.$emit('quote-updated', quote)
						}

                        $(this.queryModalId).modal('hide')
					})
					.catch(error => {
						this.submitButtonEnabled = true

						if (this.isAdd) {
							this.errorMessage = 'Не удалось добавить цитату'
						} else {
							this.errorMessage = 'Не удалось изменить цитату'
						}
					})
			}
		},
		beforeDestroy() {
			this.$root.bus.$off('edit-quote', this.onEditQuote)
			this.$root.bus.$off('add-quote', this.onAddQuote)
		}
	}

</script>