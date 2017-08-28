<template>
    <div class="modal fade" :id="modalId" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Добавить книгу</h4>
                </div>
                <form @submit.prevent="onAddBookSubmit">
                    <div class="modal-body">
                        <p>Можно, конечно, вписывать название, автора, обложку выбирать, но достаточно</p>
                        <div class="form-group">
                            <label for="bookUrl">Ссылки на <a href="https://livelib.ru/find" target="_blank">LiveLib</a></label>
                            <input v-model="addBookUrl" class="form-control" name="bookUrl" id="bookUrl" placeholder="Вставьте ссылку на книгу на сайте LiveLib"
                                required autocomplete="off" autofocus>
                        </div>
                        <ErrorAlert :alert-type="errorAlertType" :message="addErrorMessage"></ErrorAlert>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Отмена</button>
                        <input type="submit" :class="['btn', 'btn-info', !addButtonEnabled ? 'disabled' : '']" value="Добавить">
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
                addBookUrl: '',
                addButtonEnabled: true,
                addErrorMessage: '',
                errorAlertType: '',
                modalId: 'addBookModal'
            }
        },
        mounted() {
            $(this.queryModalId).on('shown.bs.modal', function () {
                $(this).find('[autofocus]').focus()
            })

            this.$root.bus.$on('add-book', () => {
                this.addButtonEnabled = true
                this.addBookUrl = ''
                this.addErrorMessage = ''
                $(this.queryModalId).modal('show')
            })
        },
        computed: {
            queryModalId() {
                return '#' + this.modalId
            }
        },
        methods: {
            onAddBookSubmit() {
                if (!this.addButtonEnabled) {
                    return
                }
                this.addButtonEnabled = false
                this.addErrorMessage = ''
                this.addBook()
            },
            addBook() {
                Books(this.$root).add(this.addBookUrl)
                    .then(newBook => {
                        newBook.quotesCount = 0
                        this.$root.$data.books.splice(0, 0, newBook)
                        $(this.queryModalId).modal('hide')
                        this.$root.bus.$emit('book-added')
                    })
                    .catch(error => {
                        this.addButtonEnabled = true
                        if (error.code == 409) {
                            this.errorAlertType = 'warning'
                            this.addErrorMessage = 'Книга уже в вашей коллекции'
                        } else if (error.code == 404) {
                            this.errorAlertType = 'danger'
                            this.addErrorMessage = 'Не удалось получить информацию о книге'
                        } else {
                            this.errorAlertType = 'danger'
                            this.addErrorMessage = 'Не удалось добавить книгу'
                        }
                    })
            }
        }
    }

</script>