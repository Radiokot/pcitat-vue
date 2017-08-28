<template>
	<div class="modal fade" :id="modalId" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Удалить книгу?</h4>
				</div>
				<form @submit.prevent="onDeleteBookSubmit">
					<div class="modal-body">
						<p>Будет удалена книга «<strong>{{ bookTitle }}</strong>» и все цитаты из нее.</p>
						<ErrorAlert v-if="error" message="Не удалось удалить книгу"></ErrorAlert>
					</div>	
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Отмена</button>
						<input type="submit" :class="['btn', 'btn-danger', !deleteButtonEnabled ? 'disabled' : '']" value="Удалить">
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
	import Books from '@/api/books'

	export default {
		data() {
			return {
				deleteButtonEnabled: true,
				bookId: '',
				bookTitle: '',
				modalId: 'deleteBookModal',
				error: false
			}
		},
		mounted() {
			$(this.queryModalId).on('', function () {
				$(this).find('[autofocus]').focus()
			})

            this.$root.bus.$on('delete-book', this.onDeleteBook)
		},
		computed: {
			queryModalId() {
				return '#' + this.modalId
			}
		},
		methods: {
			onDeleteBook(bookId, bookTitle) {
				this.bookId = bookId
				this.bookTitle = bookTitle
                this.deleteButtonEnabled = true
                this.error = false
                $(this.queryModalId).modal('show')
			},
			onDeleteBookSubmit() {
				if (!this.deleteButtonEnabled) {
					return
				}

				this.deleteButtonEnabled = false
				this.error = false
				this.deleteBook()
			},
			deleteBook() {
				Books(this.$root).delete(this.bookId)
					.then(result => {
						let book = this.$root.$data.books
							.find(it => it.id == this.bookId)
						let index = this.$root.$data.books.indexOf(book)
						this.$root.$data.books.splice(index, 1)

						this.$root.bus.$emit('book-deleted', this.bookId)

						$(this.queryModalId).modal('hide')
					})
					.catch(error => {
						this.deleteButtonEnabled = true
						this.error = true
					})
			},
			beforeDestroy() {
				this.$root.bus.$off('delete-book', this.onDeleteBook)
			}
		}
	}

</script>