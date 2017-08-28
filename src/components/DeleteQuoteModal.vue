<template>
    <div class="modal fade" :id="modalId" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Удалить цитату?</h4>
                </div>
                <form @submit.prevent="onDeleteSubmit">
                    <ErrorAlert v-if="error" message="Не удалось удалить книгу"></ErrorAlert>
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
    import Quotes from '@/api/quotes'

    export default {
        data() {
            return {
                deleteButtonEnabled: true,
                quoteId: '',
                modalId: 'deleteQuoteModal',
                error: false
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

            this.$root.bus.$on('delete-quote', this.onDeleteQuote)
        },
        methods: {
            onDeleteQuote(quoteId) {
                this.quoteId = quoteId
                this.deleteButtonEnabled = true
                this.error = false
                $(this.queryModalId).modal('show')
            },
            onDeleteSubmit() {
                if (!this.deleteButtonEnabled) {
                    return
                }

                this.deleteButtonEnabled = false
                this.error = false
                this.deleteQuote()
            },
            deleteQuote() {
                Quotes(this.$root).delete(this.quoteId)
                    .then(result => {
                        let book = this.$root.$data.books
								.find(it => it.id == this.bookId)
                        let index = this.$root.$data.books.indexOf(book)
                        if (index != -1) {
                            book.quotesCount = parseInt(book.quotesCount) - 1
                            this.$set(this.$root.$data.books, index, book)
                        }

                        this.$root.bus.$emit('quote-deleted', this.quoteId)
                        $(this.queryModalId).modal('hide')
                    })
                    .catch(error => {
                        console.log(error)
                        this.deleteButtonEnabled = true
                        this.error = true
                    })
            }
        },
        beforeDestroy() {
            this.$root.bus.$off('delete-quote', this.onDeleteQuote)
        }
    }

</script>